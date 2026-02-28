from datetime import datetime, timezone
from fastapi import HTTPException
from sqlmodel import Session, select
from jose import jwt, JWTError

from app.models import User, RefreshToken
from app.core.security import (
    verify_password, create_access_token, create_refresh_token, hash_password
)
from app.core.config import SECRET_KEY, ALGORITHM


def authenticate_user(session: Session, username: str, password: str):
    user = session.exec(select(User).where(User.username == username)).first()
    if not user:
        return None
    if not verify_password(password, user.password):
        return None
    return user

def login_user(session: Session, username: str, password: str):
    user = authenticate_user(session, username, password)
    if not user:
        raise HTTPException(status_code=401, detail="نام کاربری یا رمز عبور اشتباه است")
    if not user.is_active:
        raise HTTPException(status_code=403, detail="حساب کاربری شما غیر فعال است")
    
    user.last_login = datetime.now(timezone.utc)
    session.add(user)
    
    access = create_access_token({"sub": str(user.id)})
    refresh = create_refresh_token({"sub": str(user.id)})
    db_token = RefreshToken(user_id=user.id, token=refresh)
    session.add(db_token)
    session.commit()
    session.refresh(user)
    return access, refresh

def refresh_access_token(session: Session, refresh_token: str):
    db_token = session.exec(
        select(RefreshToken).where(RefreshToken.token == refresh_token)
    ).first()

    if not db_token:
        return None

    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
    except JWTError:
        session.delete(db_token)
        session.commit()
        return None
    
    new_access = create_access_token({"sub": user_id})
    return new_access

def logout_user(session: Session, refresh_token: str):
    db_token = session.exec(
        select(RefreshToken).where(RefreshToken.token == refresh_token)
    ).first()

    if not db_token:
        return False
    
    session.delete(db_token)
    session.commit()
    return True


def change_user_password(
    user_id: int, 
    old_password: str, new_password: str,
    session: Session
):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if not verify_password(old_password, user.password):
        return HTTPException(status_code=400, detail="Old password is incorrect")
    
    user.password = hash_password(new_password)
    session.commit()
    return {"detail": "Password changed successfully"}
    
    


