from datetime import date
from enum import Enum
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import ARRAY
from typing import Optional, List


class CartableTypes(str, Enum):
    tickets = "tickets"
    internal = "internal"
    fusion = "fusion"
    
class Staff(SQLModel, table=True):
    __tablename__ = "staffs"
    id: Optional[int] = Field(default=None, primary_key=True)
    
    user_id: int = Field(foreign_key="users.id", unique=True)
    user: "User" = Relationship(back_populates="staff") # type: ignore
    
    display_name: str
    birth_date: date
    national_id: str
    father_name: str
    
    mobile: str
    phone: str
    org_mobile: str
    org_phone: str
    address: str
    
    org_image: Optional[str] = None
    
    cartable_types: List[CartableTypes] = Field(
        sa_column=Column(ARRAY(String)),
        default_factory=list
    )

