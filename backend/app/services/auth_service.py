from sqlmodel import Session, select
from jose import jwt, JWTError


from app.models.user_model import User
from app.models.refresh_token import RefreshToken
from app.core.security import verify_password, create_access_token, create_refresh_token
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
        return None
    
    access = create_access_token({"sub": str(user.id)})
    refresh = create_refresh_token({"sub": str(user.id)})

    db_token = RefreshToken(user_id=user.id, token=refresh)
    session.add(db_token)
    session.commit()

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