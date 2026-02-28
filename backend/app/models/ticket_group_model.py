from sqlmodel import SQLModel, Field, Relationship
from typing import Optional


class TicketGroup(SQLModel, table=True):
    __tablename__ = "ticket_groups"
    id: Optional[int] = Field(default=None, primary_key=True)

    title: str = Field(index=True, unique=True)

    ticket: Optional["Ticket"] = Relationship(back_populates="group") # type: ignore
    