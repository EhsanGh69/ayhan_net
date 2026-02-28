from datetime import date
from pydantic import BaseModel, Field
from typing import List

from app.models.staff_model import CartableTypes
from app.schemas.auth_schema import UserDetailSchema


class StaffBaseSchema(BaseModel):
    display_name: str = Field(min_length=3, max_length=50, pattern=r"^[A-Za-z0-9\u0600-\u06FF\s_.@-]+$")
    birth_date: date
    national_id: str = Field(pattern=r"^\d{10}$")
    father_name: str = Field(pattern=r"^[\u0600-\u06FF\s]{3,50}$")
    mobile: str = Field(pattern=r"^(\+98|0)?9\d{9}$")
    phone: str = Field(pattern=r"^0\d{2,3}[-\s]?\d{8}$")
    org_mobile: str = Field(pattern=r"^(\+98|0)?9\d{9}$")
    org_phone: str = Field(pattern=r"^\d{1,10}$")
    address: str = Field(min_length=1, max_length=200, pattern=r"^[\w\u0600-\u06FF\s\-,.]+$")
    cartable_types: List[CartableTypes] = Field(default_factory=list)


class StaffDetailSchema(StaffBaseSchema):
    user: UserDetailSchema
    org_image: str | None
    
    model_config = { "from_attributes": True }
    
    
class StaffListSchema(BaseModel):
    user: UserDetailSchema
    mobile: str
    display_name: str
    cartable_types: List[CartableTypes]
    
    model_config = { "from_attributes": True }
