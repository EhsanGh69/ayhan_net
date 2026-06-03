from fastapi import APIRouter, Depends, HTTPException, Header, Body
from sqlmodel import Session

from app.db.session import get_session
from app.core.error_handler import handle_errors
from app.schemas.auth_schema import LoginSchema, CurrentUserSchema, ChangePasswordSchema
from app.services.auth_service import (
    login_user, refresh_access_token, logout_user, change_user_password
)
from app.core.dependencies import get_current_user, verify_access

router = APIRouter(prefix="/api/auth", tags=["Auth"])


@router.post("/login")
@handle_errors
def login(credentials: LoginSchema, session: Session = Depends(get_session)):
    tokens = login_user(session, credentials.username, credentials.password)
    if not tokens:
        raise HTTPException(status_code=401, detail="نام کاربری یا رمز عبور اشتباه است")
    
    access, refresh = tokens
    return {"access_token": access, "refresh_token": refresh}


@router.post("/refresh")
@handle_errors
def refresh(authorization: str = Header(...), session: Session = Depends(get_session)):
    if not authorization.startswith("Bearer "): 
        raise HTTPException(status_code=400, detail="Invalid authorization header")
    refresh_token = authorization.split(" ")[1]
    new_access = refresh_access_token(session, refresh_token)
    if not new_access:
        raise HTTPException(status_code=401, detail="Invalid or expired refresh Token")
    
    return {"access_token": new_access}

@router.get("/me")
@handle_errors
def get_me(current_user = Depends(get_current_user)):
    return CurrentUserSchema.model_validate(current_user)

@router.post("/logout")
@handle_errors
def logout(authorization: str = Header(...), session: Session = Depends(get_session)):
    if not authorization.startswith("Bearer "): 
        raise HTTPException(status_code=400, detail="Invalid authorization header")
    refresh_token = authorization.split(" ")[1]
    success = logout_user(session, refresh_token)
    if not success:
        raise HTTPException(status_code=400, detail="Invalid refresh token")
    
    return {"detail": "Logged out successfully"}


@router.post("/change-password")
@handle_errors
def change_password(
    data: ChangePasswordSchema,
    user_id: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return change_user_password(user_id, data.old_password, data.new_password, session)


