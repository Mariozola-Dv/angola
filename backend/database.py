import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# 1. Tenta pegar a URL do Railway. Se não achar, usa o banco local.
# O Railway injeta 'DATABASE_URL' automaticamente. 
# No seu PC, se a variável não estiver definida, ele cai no segundo parâmetro.
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:123456@localhost:5432/agritwin")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# 2. Dependency para o FastAPI usar o banco
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 3. Função de inicialização segura
def init_db():
    try:
        # Importa os modelos apenas aqui para evitar erro de importação circular
        from models import User 
        # Cria as tabelas se não existirem
        Base.metadata.create_all(bind=engine)
        print("Banco de dados verificado com sucesso.")
    except Exception as e:
        print(f"Erro ao inicializar o banco: {e}")

# Executa a verificação sempre que este arquivo for importado
init_db()