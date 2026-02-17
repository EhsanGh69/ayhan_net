from fastapi import Depends, HTTPException, Header
from sqlmodel import Session, select

from app.db.session import get_session
from app.models.user_model import User
from app.core.security import verify_token


def get_current_user(authorization: str = Header(...), session: Session = Depends(get_session)):
    if not authorization.startswith("Bearer "): 
        raise HTTPException(status_code=400, detail="Invalid authorization header")
    token = authorization.split(" ")[1]
    user_id = verify_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="invalid token")
    
    user = session.exec(select(User).where(User.id == int(user_id))).first()
    if not user:
        raise HTTPException(status_code=401, detail="User does not exist")
    if not user.is_active:
        raise HTTPException(status_code=401, detail="User is inactive")
    
    return user

def verify_access(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "): 
        raise HTTPException(status_code=400, detail="Invalid authorization header")
    token = authorization.split(" ")[1]
    user_id = verify_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="invalid token")
    
    return user_id