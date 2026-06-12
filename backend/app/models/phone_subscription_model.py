from enum import Enum
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional

class PhoneTypes(str, Enum):
    pstn = "PSTN"
    sip_phone = "Sip Phone"


class PhoneSubscription(SQLModel, table=True):
    __tablename__ = "phone_subscriptions"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    subscriber_id: int = Field(foreign_key="subscribers.id", unique=True)
    
    phone_number: Optional[str] = None
    telecom_center: Optional[str] = Field(default=None, description="مرکز مخابراتی")
    phone_type: Optional[PhoneTypes] = Field(default=None, description="نوع خط تلفن")
    
    user_sip_phone: Optional[str] = None
    pass_sip_phone: Optional[str] = None
    ip_sip_phone: Optional[str] = None
    
    phone_sub_status: str
    file_number: Optional[str] = Field(default=None, description="شماره پرونده")
    
    subscriber: Optional["Subscriber"] = Relationship(back_populates="phone_sub") # type: ignore
    
    

class NationalIdImage(SQLModel, table=True):
    __tablename__ = "nationalId_images"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    subscriber_id: int = Field(foreign_key="subscribers.id", unique=True)
    
    nid_image: str = Field(description="تصویر کارت ملی")
    
    subscriber: Optional["Subscriber"] = Relationship(back_populates="nid_sub") # type: ignore

