from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session

from app.db.session import get_session
from app.models import User, Staff
from app.core.security import hash_password
from app.core.dependencies import verify_admin
from app.schemas.auth_schema import AdminCreateSchema
from app.schemas.auth_schema import PasswordSchema
from app.core.config import ADMIN_BOOTSTRAP_SECRET

router = APIRouter(prefix="/api/admin", tags=["Admin"])

@router.post("/create")
def create_admin(data: AdminCreateSchema, session: Session = Depends(get_session)):
    # check secret
    if data.secret != ADMIN_BOOTSTRAP_SECRET:
        raise HTTPException(status_code=403, detail="Forbidden")
    
    # # create admin user
    user = User(
        username=data.username, password=hash_password(data.password),
        first_name=data.first_name, last_name=data.last_name,
        is_admin=True, is_staff=True
    )
    session.add(user)
    session.flush()

    staff = Staff(
        org_image=None, 
        user_id=user.id,
        display_name="نام-نمایشی",
        birth_date="1990-01-01",
        national_id="0000000000",
        father_name="نام پدر",
        mobile="09180000000",
        phone="08600000000",
        org_mobile="09180000000",
        org_phone="111",
        address="آدرس محل سکونت"
    )

    session.add(staff)
    session.commit()
    session.refresh(user)

    return {"detail": "Admin created successfully", "id": user.id, "username": user.username}



@router.post("/reset-password/{user_id}")
def reset_user_password(
    user_id: int, 
    data: PasswordSchema, 
    auth_admin = Depends(verify_admin),
    session: Session = Depends(get_session)
):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.password = hash_password(data.password)
    session.commit()
    return {"detail": "Password reset successfully"}

