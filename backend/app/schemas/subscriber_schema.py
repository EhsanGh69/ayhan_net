from datetime import date
from pydantic import BaseModel, Field

from app.models.subscriber_model import SubscriberTypes


class SubscriberBaseSchema(BaseModel):
    first_name: str = Field(min_length=3, max_length=50, pattern=r"^[\u0600-\u06FF\s]+$")
    last_name: str = Field(min_length=3, max_length=50, pattern=r"^[\u0600-\u06FF\s]+$")
    father_name: str = Field(pattern=r"^[\u0600-\u06FF\s]{3,50}$")
    national_id: str = Field(pattern=r"^\d{10}$")
    birth_date: date
    certificate_number: str = Field(pattern=r"^\d{1,10}$")
    mobile: str = Field(pattern=r"^(\+98|0)?9\d{9}$")
    phone: str = Field(pattern=r"^[1-9]\d{9}$")
    area: int
    main_street: str = Field(max_length=50)
    side_street: str = Field(max_length=50)
    alley:str | None = Field(max_length=50)
    building_name: str | None = Field(max_length=50)
    house_number: str = Field(max_length=10, min_length=1)
    postal_code: str = Field(max_length=10, min_length=10)
    subscriber_type: SubscriberTypes
    
class SubscriberListSchema(BaseModel):
    id: int
    first_name: str
    last_name: str
    national_id: str
    phone: str
    status: str
    
    model_config = { "from_attributes": True }
    
class SubscriberViewSchema(SubscriberBaseSchema):
    province: str
    city: str
    
    model_config = { "from_attributes": True }

class SubscriberDetailSchema(SubscriberBaseSchema):
    province_id: int
    city_id: int
    
    model_config = { "from_attributes": True }
    