from pydantic import BaseModel
from typing import Optional

from app.models.phone_subscription_model import PhoneTypes


class ChangeStatusSchema(BaseModel):
    phone_type: PhoneTypes
    phone_number: str
    user_sip_phone: Optional[str] = None
    pass_sip_phone: Optional[str] = None
    ip_sip_phone: Optional[str] = None


class ChangeTechSchema(BaseModel):
    user_sip_phone: str
    pass_sip_phone: str
    ip_sip_phone: str


class SubsInfo(BaseModel):
    id: int
    first_name: str
    last_name: str

class ChangeTechList(BaseModel):
    subscriber: SubsInfo
    phone_number: str
    phone_type: PhoneTypes
    
    model_config = { "from_attributes": True }
    

class NewApplicantList(BaseModel):
    subscriber: SubsInfo

    model_config = { "from_attributes": True }


class NewApplicantSchema(ChangeStatusSchema):
    file_number: str
    
