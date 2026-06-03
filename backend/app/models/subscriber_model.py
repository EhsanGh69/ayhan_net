from datetime import date
from enum import Enum
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional


class SubscriberTypes(str, Enum):
    real = "real"
    legal = "legal"
 

class Subscriber(SQLModel, table=True):
    __tablename__ = "subscribers"
    id: Optional[int] = Field(default=None, primary_key=True)
    
    first_name: str
    last_name: str
    father_name: Optional[str] = None
    national_id: Optional[str] = None
    birth_date: Optional[date] = None
    certificate_number: Optional[str] = Field(default=None, description="شماره شناسنامه")
    
    mobile: str
    phone: Optional[str] = None
    
    province_id: Optional[int] = None
    city_id: Optional[int] = None
    area: Optional[int] = Field(default=None, description="منطقه")
    
    main_street: Optional[str] = Field(default=None, description="خیابان اصلی")
    side_street: Optional[str] = Field(default=None, description="خیابان فرعی")
    alley: Optional[str] = Field(default=None, description="کوچه اصلی")
    side_alley: Optional[str] = Field(default=None, description="کوچه فرعی")
    
    building_name: Optional[str] = Field(default=None, description="نام ساختمان")
    floor: Optional[str] = Field(default=None, description="طبقه")
    unit: Optional[str] = Field(default=None, description="واحد")
    house_number: Optional[str] = Field(default=None, description="پلاک")
    postal_code: str = Field(description="کد پستی")
    
    subscriber_type: Optional[SubscriberTypes] = None
    status: str = Field(default="پیش ثبت نام")
    subscriber_code: Optional[str] = None
    
    subscriber_ticket: Optional["TicketRecord"] = Relationship(back_populates="subscriber") # type: ignore
    corporation: Optional["Corporation"] = Relationship(back_populates="subscriber") # type: ignore
     