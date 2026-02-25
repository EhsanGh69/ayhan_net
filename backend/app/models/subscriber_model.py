from datetime import date
from enum import Enum
from sqlmodel import SQLModel, Field
from typing import Optional


class SubscriberTypes(str, Enum):
    real = "real"
    legal = "legal"


class Subscriber(SQLModel, table=True):
    __tablename__ = "subscribers"
    id: Optional[int] = Field(default=None, primary_key=True)
    
    first_name: str
    last_name: str
    father_name: str
    national_id: str
    birth_date: date
    certificate_number: str = Field(description="شماره شناسنامه")
    
    mobile: str
    phone: str
    
    province_id: int
    city_id: int
    area: int = Field(description="منطقه")
    
    main_street: str = Field(description="خیابان اصلی")
    side_street: str = Field(description="خیابان فرعی")
    alley:str = Field(description="کوچه")
    
    building_name: str = Field(description="نام ساختمان")
    house_number: str = Field(description="پلاک")
    postal_code: str = Field(description="کد پستی")
    
    subscriber_type: SubscriberTypes
    status: str = Field(default="پیش ثبت نام")
     