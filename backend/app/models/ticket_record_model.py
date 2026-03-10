from datetime import datetime
from enum import Enum
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Text, Column, Enum as SAEnum
from sqlalchemy.sql import func
from typing import Optional


class TicketStatus(str, Enum):
    OPEN = "open"
    CLOSE = "close"


class TicketRecord(SQLModel, table=True):
    __tablename__ = "ticket_records"
    id: Optional[int] = Field(primary_key=True, default=None)
    
    group: str
    name: str
    content: str = Field(sa_type=Text)
    
    parent_ticket_id: Optional[int] = Field(foreign_key="ticket_records.id", default=None)
    parent_ticket: Optional["TicketRecord"] = Relationship(back_populates="response",
                                        sa_relationship_kwargs={"remote_side": "[TicketRecord.id]"})
    response: "TicketRecord" = Relationship(back_populates="parent_ticket")
    
    subscriber_id: int = Field(foreign_key="subscribers.id", ondelete="CASCADE")
    subscriber: "Subscriber" = Relationship(back_populates="subscriber_ticket") # type: ignore
    
    user_id: int = Field(foreign_key="staffs.id", ondelete="CASCADE", description="کاربر ثبت کننده تیکت")
    user: "Staff" = Relationship(back_populates="user_ticket", # type: ignore
                                sa_relationship_kwargs={"foreign_keys": "[TicketRecord.user_id]"}) 
    
    staff_id: Optional[int] = Field(foreign_key="staffs.id", ondelete="CASCADE", default=None,
                                    description="کاربر ارجاع تیکت")
    staff: "Staff" = Relationship(back_populates="staff_ticket", # type: ignore
                                sa_relationship_kwargs={"foreign_keys": "[TicketRecord.staff_id]"}) 
    
    status: TicketStatus = Field(default=TicketStatus.OPEN, 
                                sa_column=Column(SAEnum(TicketStatus, name="ticket_status")))
    created_at: Optional[datetime] = Field(default=None, 
                sa_column_kwargs={"server_default": func.now()})
    updated_at: Optional[datetime] = Field(default=None,
                sa_column_kwargs={"server_default": func.now(), "onupdate": func.now()})


