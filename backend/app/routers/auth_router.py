from fastapi import APIRouter, Depends, HTTPException, Header
from sqlmodel import Session

from app.db.session import get_session
from app.schemas.auth_schema import LoginSchema, CurrentUserSchema
from app.services.auth_service import (
    login_user, refresh_access_token, logout_user
)
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/api/auth", tags=["Auth"])


@router.post("/login")
def login(credentials: LoginSchema, session: Session = Depends(get_session)):
    tokens = login_user(session, credentials.username, credentials.password)
    if not tokens:
        raise HTTPException(status_code=401, detail="Invalid Credentials")
    
    access, refresh = tokens
    return {"access_token": access, "refresh_token": refresh}


@router.post("/refresh")
def refresh(authorization: str = Header(...), session: Session = Depends(get_session)):
    if not authorization.startswith("Bearer "): 
        raise HTTPException(status_code=400, detail="Invalid authorization header")
    refresh_token = authorization.split(" ")[1]
    new_access = refresh_access_token(session, refresh_token)
    if not new_access:
        raise HTTPException(status_code=401, detail="Invalid or expired refresh Token")
    
    return {"access_token": new_access}

@router.get("/me")
def get_me(current_user = Depends(get_current_user)):
    return CurrentUserSchema.model_validate(current_user)

@router.post("/logout")
def logout(authorization: str = Header(...), session: Session = Depends(get_session)):
    if not authorization.startswith("Bearer "): 
        raise HTTPException(status_code=400, detail="Invalid authorization header")
    refresh_token = authorization.split(" ")[1]
    success = logout_user(session, refresh_token)
    if not success:
        raise HTTPException(status_code=400, detail="Invalid refresh token")
    
    return {"detail": "Logged out successfully"}
