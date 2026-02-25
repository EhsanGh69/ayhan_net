import uuid
import os
from fastapi import UploadFile, HTTPException
from sqlmodel import Session, select

from app.models import User, Staff
from app.schemas.auth_schema import UserBaseSchema, UserCreateSchema
from app.schemas.staff_schema import StaffBaseSchema
from app.core.security import hash_password

MEDIA_ROOT = "app/media/org_images"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "webp"}
MAX_FILE_SIZE = 200 * 1024  # 200KB

def validate_org_image(file: UploadFile):
    ext = file.filename.split(".")[-1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"فرمت تصویر آپلود شده غیرمجاز است"
        )
    
    file.file.seek(0, 2) # go to end of file
    size = file.file.tell()
    file.file.seek(0) # go to start of file
    if size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail=f"سایز تصویر آپلود شده بیش از حد مجاز است"
        )
    

def save_org_image(file: UploadFile):
    ext = file.filename.split(".")[-1]
    unique_name = f"{uuid.uuid4()}.{ext}"
    file_path = os.path.join(MEDIA_ROOT, unique_name)
    with open(file_path, "wb") as f:
        f.write(file.file.read())
        
    return unique_name

def delete_org_image(filename: str):
    if not filename:
        return
    file_path = os.path.join(MEDIA_ROOT, filename)
    if os.path.exists(file_path):
        os.remove(file_path)


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
        validate_org_image(org_image)
        filename = save_org_image(org_image)
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
        validate_org_image(org_image)
        delete_org_image(staff.org_image)
        new_filename = save_org_image(org_image)
        staff.org_image = new_filename
        
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
    staffs = session.exec(select(Staff)).all()
    return staffs

def get_staff_detail(user_id: int, session: Session):
    staff = session.exec(select(Staff).where(Staff.user_id == user_id)).first()
    if not staff:
        raise HTTPException(status_code=404, detail="User staff not found")
    
    return staff
    


    