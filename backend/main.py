import os
import json
import base64
import bcrypt
import httpx
import uuid
import asyncio
from fastapi import FastAPI, UploadFile, File, Form, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from openai import AsyncOpenAI
from database import get_db
from models import User

# Inicialização segura: A chave é lida do ambiente do seu sistema
client_openai = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()

# Configuração Dinâmica de URL para Produção
BASE_URL = os.getenv("BACKEND_URL", "http://localhost:8000")

# Configuração de Pasta Estática
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")

if not os.path.exists(STATIC_DIR):
    os.makedirs(STATIC_DIR)

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

API_URL = "https://vanessa-gateway-api.tuyenecomesso.com/v1/inference"
TOKEN = "vkg_live_yl7naJYI0nJbiQK9b2SaApJH32qImT6x"

SYSTEM_DIRECTIVE = (
    "Você é a Vanessa, consultora de agronomia. Responda APENAS em JSON estrito. "
    'Formato: {"analise_tecnica": "...", "advertencias": ["..."], '
    '"mapa_de_altura": [0.1], "projecoes": {"ano_0": "...", "ano_1": "..."}, '
    '"elementos": {"cor_chao": "#2d5a27"}}'
)

async def gerar_imagem_local(prompt: str):
    try:
        response = await client_openai.images.generate(
            model="dall-e-3", 
            prompt=f"Aerial view of agricultural site: {prompt}. High resolution.",
            size="1024x1024", quality="standard", n=1
        )
        url_openai = response.data[0].url
        
        async with httpx.AsyncClient(timeout=30.0) as client:
            img_response = await client.get(url_openai)
            if img_response.status_code == 200:
                nome_arquivo = f"{uuid.uuid4()}.png"
                caminho_local = os.path.join(STATIC_DIR, nome_arquivo)
                with open(caminho_local, 'wb') as f:
                    f.write(img_response.content)
                return f"{BASE_URL}/static/{nome_arquivo}"
        return None
    except Exception as e:
        print(f"Erro imagem: {e}")
        return None

@app.post("/analisar")
async def processar_analise(texto: str = Form("Analise este território."), file: UploadFile = File(None)):
    image_base64 = base64.b64encode(await file.read()).decode('utf-8') if file else ""
    
    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            payload = {"service": "vision", "input": {"text": f"{SYSTEM_DIRECTIVE} | Pergunta: {texto}", "image_base64": image_base64}}
            response = await client.post(API_URL, headers={"Authorization": f"Bearer {TOKEN}"}, json=payload)
            
            if response.status_code != 200:
                return {"status": "erro", "info": "Servidor de IA indisponível"}

            output_clean = response.json().get("output_text", "").replace("```json", "").replace("
```", "").strip()
            data = json.loads(output_clean)
            
            projecoes = data.get("projecoes", {})
            chaves = list(projecoes.keys())
            prompts = list(projecoes.values())
            
            resultados = await asyncio.gather(*[gerar_imagem_local(p) for p in prompts])
            
            for i, chave in enumerate(chaves):
                if resultados[i]:
                    projecoes[chave] = {"descricao": prompts[i], "url": resultados[i]}
                else:
                    projecoes[chave] = {"descricao": prompts[i], "url": None}
            
            data["projecoes"] = projecoes
            return {"status": "ok", "dados_3d": data}
            
    except Exception as e:
        print(f"Erro crítico: {e}")
        return {"status": "erro", "info": str(e)}

@app.post("/auth/register")
def register(email: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == email).first(): return {"status": "erro", "mensagem": "E-mail já cadastrado"}
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    new_user = User(email=email, password=hashed, is_configured=False)
    db.add(new_user); db.commit(); return {"status": "ok", "user_id": new_user.id}

@app.post("/auth/login")
def login(email: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user or not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')): 
        return {"status": "erro", "mensagem": "Credenciais inválidas"}
    return {"status": "ok", "user_id": user.id, "is_configured": bool(user.is_configured)}

@app.post("/auth/set-workspace")
def set_workspace(user_id: int = Form(...), workspace: str = Form(...), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        user.workspace_type = workspace; user.is_configured = True; db.commit()
        return {"status": "ok"}
    return {"status": "erro", "mensagem": "Usuário não encontrado"}
# Para rodar: python -m uvicorn main:app --reload