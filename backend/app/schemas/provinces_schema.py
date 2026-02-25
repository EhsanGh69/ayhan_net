from pydantic import BaseModel
from typing import List

class City(BaseModel):
    id: int
    name: str
    
class Province(BaseModel):
    id: int
    name: str
    
class ProvinceCities(BaseModel):
    province_id: int
    cities: List[City]