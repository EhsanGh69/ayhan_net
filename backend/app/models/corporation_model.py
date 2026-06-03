from sqlmodel import SQLModel, Field, Relationship
from typing import Optional


class Corporation(SQLModel, table=True):
    __tablename__ = "corporations"

    id: Optional[int] = Field(default=None, primary_key=True)
    subscriber_id: int = Field(foreign_key="subscribers.id", unique=True)

    name: str
    registration_number: str = Field(description="شماره ثبت")
    national_id: str = Field(description="شناسه ملی")

    subscriber: Optional["Subscriber"] = Relationship(back_populates="corporation") # type: ignore
