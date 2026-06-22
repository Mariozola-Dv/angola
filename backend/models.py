from sqlalchemy import Column, Integer, String, Boolean
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    workspace_type = Column(String, nullable=True) # Agricultura, Infraestrutura ou Ambos
    is_configured = Column(Boolean, default=False)