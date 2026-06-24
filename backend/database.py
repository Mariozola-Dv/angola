import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# O Railway injeta automaticamente a variável DATABASE_URL
# Se ela não existir, usa o localhost (para rodar na sua máquina)
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:123456@localhost:5432/agritwin")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()