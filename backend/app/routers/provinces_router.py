from fastapi import APIRouter, HTTPException
from typing import List

from app.services.provinces_loader import PROVINCES, CITIES
from app.schemas.provinces_schema import Province, ProvinceCities

router = APIRouter(prefix="/api/provinces", tags=["Provinces"])

@router.get("/", response_model=List[Province])
def get_provinces():
    return PROVINCES

@router.get("/{province_id}", response_model=ProvinceCities)
def get_cities(province_id: int):
    for province in CITIES:
        if province["province_id"] == province_id:
            return province
    
    return HTTPException(status_code=404, detail="Province not found")



