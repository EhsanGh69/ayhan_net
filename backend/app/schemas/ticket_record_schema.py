from datetime import datetime
from pydantic import BaseModel

from app.models.ticket_record_model import TicketStatus
from app.schemas.subscriber_schema import SubscriberListSchema
from app.schemas.staff_schema import CurrentStaffSchema
    
    
class TicketRecordResponse(BaseModel):
    group: str
    name: str
    content: str
    status: TicketStatus
    user_id: int
    staff_id: int | None
    
    
class TicketRecordCreate(TicketRecordResponse):
    subscriber_id: int
    

class TicketChangeStaff(BaseModel):
    staff_id: int
    

class TicketRecordList(BaseModel):
    id: int
    group: str
    name: str
    status: TicketStatus
    user: CurrentStaffSchema
    staff: CurrentStaffSchema | None
    created_at: datetime
    
    model_config = { "from_attributes": True }
    

class TicketRecordDetail(TicketRecordList):
    content: str
    staff: CurrentStaffSchema | None
    subscriber: SubscriberListSchema
    updated_at: datetime
    
    model_config = { "from_attributes": True }

