from datetime import datetime, timezone
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional


class Ticket(SQLModel, table=True):
    __tablename__ = "tickets"
    id: Optional[int] = Field(default=None, primary_key=True)

    group_id: int = Field(foreign_key="ticket_groups.id", ondelete="CASCADE")
    group: "TicketGroup" = Relationship(back_populates="ticket") # type: ignore

    name: str = Field(index=True)
    description: str 
    is_active: bool = Field(default=True)

    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
