from fastapi import HTTPException
from fastapi.responses import JSONResponse
from sqlmodel import Session, select, and_

from app.models import Province, City, Area
from app.schemas.location_schema import ProvinceSchema, CitySchema, AreaSchema 


def create_province_service(province: ProvinceSchema, session: Session):
    province_exist = session.exec(
        select(Province).where(Province.name == province.name.strip())
    ).first()

    if province_exist:
        raise HTTPException(status_code=409, detail="استان وارد شده از قبل وجود دارد")
    
    new_province = Province(name=province.name.strip())

    session.add(new_province)
    session.commit()
    return JSONResponse(status_code=201, content={"detail": "New province created successfully"})


def create_city_service(city: CitySchema, session: Session):
    city_exist = session.exec(
        select(City).where(
            and_(City.province_id == city.province_id, City.name == city.name.strip())
        )
    ).first()

    if city_exist:
        raise HTTPException(status_code=409, detail="شهرستان وارد شده از قبل وجود دارد")
    
    new_city = City(name=city.name.strip(), province_id=city.province_id)

    session.add(new_city)
    session.commit()
    return JSONResponse(status_code=201, content={"detail": "New city created successfully"})


def create_area_service(area: AreaSchema, session: Session):
    area_exist = session.exec(
        select(Area).where(
            and_(Area.city_id == area.city_id, Area.name == area.name.strip())
        )
    ).first()

    if area_exist:
        raise HTTPException(status_code=409, detail="منطقه وارد شده از در این شهرستان قبل وجود دارد")
    
    new_area = Area(name=area.name.strip(), city_id=area.city_id)

    session.add(new_area)
    session.commit()
    return JSONResponse(status_code=201, content={"detail": "New area created successfully"})


def get_provinces_service(session: Session):

    return session.exec(select(Province).order_by(Province.name)).all()


def get_province_cities_service(province_id: int, session: Session):
    province_exist = session.get(Province, province_id)

    if not province_exist:
        raise HTTPException(status_code=404, detail="Province not found")

    return session.exec(select(City).where(City.province_id == province_id).order_by(City.name)).all()


def get_city_areas_service(city_id: int, session: Session):
    city_exist = session.get(City, city_id)

    if not city_exist:
        raise HTTPException(status_code=404, detail="City not found")
    
    return session.exec(select(Area).where(Area.city_id == city_id)).all()

