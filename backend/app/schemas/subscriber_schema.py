from datetime import date
from pydantic import BaseModel, Field

from app.models.subscriber_model import SubscriberTypes


class SubscriberBaseSchema(BaseModel):
    first_name: str = Field(min_length=3, max_length=50, pattern=r"^[\u0600-\u06FF\s]+$")
    last_name: str = Field(min_length=3, max_length=50, pattern=r"^[\u0600-\u06FF\s]+$")
    father_name: str | None = Field(pattern=r"^[\u0600-\u06FF\s]{3,50}$")
    national_id: str | None = Field(pattern=r"^\d{10}$")
    birth_date: date | None
    certificate_number: str | None = Field(pattern=r"^\d{1,10}$")
    mobile: str = Field(pattern=r"^(\+98|0)?9\d{9}$")
    phone: str | None = Field(pattern=r"^[1-9]\d{9}$")
    area: int | None
    main_street: str | None = Field(max_length=50)
    side_street: str | None = Field(max_length=50)
    alley: str | None = Field(max_length=50)
    building_name: str | None = Field(max_length=50)
    house_number: str | None = Field(max_length=10, min_length=1)
    postal_code: str = Field(max_length=10, min_length=10)
    subscriber_type: SubscriberTypes | None
    
class SubscriberCreateSchema(SubscriberBaseSchema):
    province_id: int | None
    city_id: int | None

    
class SubscriberListSchema(BaseModel):
    id: int
    first_name: str
    last_name: str
    national_id: str | None
    subscriber_code: str | None
    status: str
    
    model_config = { "from_attributes": True }
    
class SubscriberViewSchema(SubscriberBaseSchema):
    id: int
    province: str
    city: str
    subscriber_code: str | None
    
    model_config = { "from_attributes": True }

class SubscriberDetailSchema(SubscriberCreateSchema):
    
    model_config = { "from_attributes": True }
    
    
class SubscriberRegister(BaseModel):
    first_name: str = Field(min_length=3, max_length=50, pattern=r"^[\u0600-\u06FF\s]+$")
    last_name: str = Field(min_length=3, max_length=50, pattern=r"^[\u0600-\u06FF\s]+$")
    mobile: str = Field(pattern=r"^(\+98|0)?9\d{9}$")
    postal_code: str = Field(max_length=10, min_length=10)
    

class CheckSubscriberExist(BaseModel):
    mobile: str = Field(pattern=r"^(\+98|0)?9\d{9}$")
    postal_code: str = Field(max_length=10, min_length=10)
