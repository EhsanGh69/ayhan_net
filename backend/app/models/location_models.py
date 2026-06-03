from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List

class Province(SQLModel, table=True):
    __tablename__ = "provinces"

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(unique=True, index=True)

    cities: List["City"] = Relationship(back_populates="province")


class City(SQLModel, table=True):
    __tablename__ = "cities"

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(unique=True, index=True)
    province_id: int = Field(foreign_key="provinces.id")

    province: Optional["Province"] = Relationship(back_populates="cities")
    areas: List["Area"] = Relationship(back_populates="city")


class Area(SQLModel, table=True):
    __tablename__ = "areas"

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(unique=True, index=True)
    city_id: int = Field(foreign_key="cities.id")

    city: Optional["City"] = Relationship(back_populates="areas")

