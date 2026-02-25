from datetime import datetime, timezone
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional


class User(SQLModel, table=True):
    __tablename__ = "users"
    id: Optional[int] = Field(default=None, primary_key=True)
 
    first_name: Optional[str] = None
    last_name: Optional[str] = None

    username: str = Field(index=True, unique=True)
    password: str

    is_admin: bool = Field(default=False)
    is_staff: bool = Field(default=False)
    is_active: bool = Field(default=True)

    date_joined: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    last_login: Optional[datetime] = None
    
    staff: Optional["Staff"] = Relationship(back_populates="user") # type: ignore
