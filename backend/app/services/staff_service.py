from fastapi import UploadFile, HTTPException
from sqlmodel import Session, select

from app.models import User, Staff
from app.schemas.auth_schema import UserBaseSchema, UserCreateSchema
from app.schemas.staff_schema import StaffBaseSchema
from app.core.security import hash_password
from app.core.file_management import image_validation, save_file, delete_file


MEDIA_ROOT = "app/media/org_images"

def create_staff_service(
    user_data: UserCreateSchema,
    staff_data: StaffBaseSchema, 
    org_image: UploadFile | None, 
    session: Session
):
    user_exist = session.exec(select(User).where(User.username == user_data.username)).first()
    if user_exist:
        return None
    user = User(
        first_name=user_data.first_name, last_name=user_data.last_name,
        username=user_data.username, password=hash_password(user_data.password),
        is_staff=True
    )
    session.add(user)
    session.flush()
    
    filename = None
    if org_image:
        image_validation(org_image)
        filename = save_file(org_image, MEDIA_ROOT)
    staff = Staff(
        **staff_data.model_dump(),
        org_image=filename, 
        user_id=user.id
    )
    session.add(staff)
    session.commit()
    session.refresh(staff)
    return staff


def update_staff_services(
    user_id: int, 
    user_data: UserBaseSchema,
    staff_data: StaffBaseSchema, 
    org_image: UploadFile | None, 
    session: Session
):
    user = session.get(User, user_id)
    if not user:
        return None
    
    for field, value in user_data.model_dump().items():
        setattr(user, field, value)
    
    staff = session.exec(select(Staff).where(Staff.user_id == user_id)).first()
    for field, value in staff_data.model_dump().items():
        setattr(staff, field, value)
    if org_image:
        image_validation(org_image)
        delete_file(staff.org_image, MEDIA_ROOT)
        staff.org_image = save_file(org_image, MEDIA_ROOT)
        
    session.commit()
    session.refresh(staff)
    return staff


def change_staff_activate(user_id: int, session: Session):
    user = session.get(User, user_id)
    if not user:
        return None
    
    current_activate = user.is_active
    user.is_active = not current_activate
    
    session.commit()
    session.refresh(user)
    return user.is_active


def get_staff_list(session: Session):
    staffs = session.exec(select(Staff).order_by(Staff.id)).all()
    return staffs

def get_staff_detail(user_id: int, session: Session):
    staff = session.exec(select(Staff).where(Staff.user_id == user_id)).first()
    if not staff:
        raise HTTPException(status_code=404, detail="کاربری یافت نشد")
    
    return staff
    