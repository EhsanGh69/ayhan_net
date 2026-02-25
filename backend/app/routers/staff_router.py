import json
from fastapi import APIRouter, Depends, HTTPException, UploadFile, Form, File
from fastapi.responses import JSONResponse
from sqlmodel import Session
from typing import List

from app.db.session import get_session
from app.schemas.auth_schema import UserCreateSchema, UserBaseSchema
from app.schemas.staff_schema import StaffBaseSchema, StaffListSchema, StaffDetailSchema
from app.services.staff_service import (
    create_staff_service, update_staff_services, change_staff_activate, get_staff_list, get_staff_detail
)
from app.core.dependencies import verify_access


router = APIRouter(prefix="/api/staff", tags=["Staff"])


@router.post("/")
def create_staff(
    auth_user: int = Depends(verify_access),
    user_data: str = Form(...), 
    staff_data: str = Form(...), 
    org_image: UploadFile | None = File(None), 
    session: Session = Depends(get_session)
):   
    try:
        user_parsed = json.loads(user_data)
        staff_parsed = json.loads(staff_data)
    except:
        raise HTTPException(status_code=400, detail="Invalid json format")
    
    try:
        user_schema = UserCreateSchema(**user_parsed)
        staff_schema = StaffBaseSchema(**staff_parsed)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=422, detail="اطلاعات ارسال شده نامعتبر می باشد")
    
    staff = create_staff_service(user_schema, staff_schema, org_image, session)
    if not staff:
        raise HTTPException(status_code=409, detail="کاربری با این نام کاربری از قبل وجود دارد")
    return JSONResponse(status_code=201, content={"detail": "New staff user created successfully"})


@router.put("/{staff_id}")
def update_staff(
    staff_id: int,
    auth_user: int = Depends(verify_access),
    user_data: str = Form(...), 
    staff_data: str = Form(...), 
    org_image: UploadFile | None = File(None), 
    session: Session = Depends(get_session)
):
    try:
        user_parsed = json.loads(user_data)
        staff_parsed = json.loads(staff_data)
    except:
        raise HTTPException(status_code=400, detail="Invalid json format")
    
    try:
        user_schema = UserBaseSchema(**user_parsed)
        staff_schema = StaffBaseSchema(**staff_parsed)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=422, detail="اطلاعات ارسال شده نامعتبر می باشد")
    
    staff = update_staff_services(staff_id, user_schema, staff_schema, org_image, session)
    if not staff:
        raise HTTPException(status_code=404, detail="Staff user dose not exist")
    return {"detail": "staff user updated successfully"}


@router.get('/activate/{staff_id}')
def change_activate(
    staff_id: int, 
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    activate = change_staff_activate(staff_id, session)
    if activate is None:
        raise HTTPException(status_code=404, detail="Staff user dose not exist")
    return {"detail": "staff activate changed successfully", "activate": activate}


@router.get("/", response_model=List[StaffListSchema])
def staff_list(
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return get_staff_list(session)

@router.get("/{staff_id}", response_model=StaffDetailSchema)
def staff_detail(
    staff_id: int,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return get_staff_detail(staff_id, session)


