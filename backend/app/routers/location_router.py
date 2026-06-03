from fastapi import APIRouter, Depends
from sqlmodel import Session
from typing import List

from app.db.session import get_session
from app.core.error_handler import handle_errors
from app.core.dependencies import verify_access
from app.schemas.location_schema import (
    ProvinceSchema, CityView, CitySchema, AreaView, AreaSchema
)
from app.services.location_service import (
    create_province_service, create_city_service, create_area_service,
    get_provinces_service, get_province_cities_service, get_city_areas_service
)


router = APIRouter(prefix="/api/location", tags=['Location'])


@router.post('/province')
@handle_errors
def create_province(
    data: ProvinceSchema,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return create_province_service(data, session)


@router.post('/city')
@handle_errors
def create_city(
    data: CitySchema,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return create_city_service(data, session)


@router.post('/area')
@handle_errors
def create_area(
    data: AreaSchema,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return create_area_service(data, session)


@router.get('/provinces')
@handle_errors
def get_provinces(
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return get_provinces_service(session)


@router.get('/provinces/{province_id}/cities', response_model=List[CityView])
@handle_errors
def get_province_cities(
    province_id: int,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return get_province_cities_service(province_id, session)


@router.get('/cities/{city_id}/areas', response_model=List[AreaView])
@handle_errors
def get_city_areas(
    city_id: int,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return get_city_areas_service(city_id, session)


