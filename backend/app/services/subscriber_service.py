from fastapi import HTTPException
from fastapi.responses import JSONResponse
from sqlmodel import Session, select, and_, desc
from sqlalchemy import func

from app.models import Subscriber
from app.core.security import generate_random_code
from app.schemas.subscriber_schema import (
    SubscriberCreateSchema, SubscriberListSchema, SubscriberViewSchema, SubscriberRegister,
    CheckSubscriberExist
)
from app.services.provinces_loader import (
    PROVINCE_CITY_IDS, PROVINCE_MAP, CITY_MAP, search_province_ids, search_city_ids
)

    
def valid_province_city_id(province_id, city_id):
    city_ids = PROVINCE_CITY_IDS.get(province_id)
    if not city_ids:
        raise HTTPException(status_code=422, detail="Province id is not valid")
    
    if city_id not in city_ids:
        raise HTTPException(status_code=422, detail="City id is not valid")
    

def check_subs_exist_service(
    subs_data: CheckSubscriberExist,
    session: Session
):
    subs_exist = session.exec(
        select(Subscriber).where(
            and_(
                Subscriber.mobile == subs_data.mobile.strip(), 
                Subscriber.postal_code == subs_data.postal_code.strip()
            )
        )
    ).first()
    if(subs_exist):
        return JSONResponse(content={"subs_exist": True})
    return JSONResponse(content={"subs_exist": False})


def create_subscriber_service(
    subscriber_data: SubscriberCreateSchema,
    session: Session
):
    valid_province_city_id(subscriber_data.province_id, subscriber_data.city_id)
    
    subs_code = generate_random_code(10)
    subscriber = Subscriber(
        **subscriber_data.model_dump(), 
        status="پیش ثبت نام",
        subscriber_code=subs_code
    )
    
    session.add(subscriber)
    session.commit()
    return JSONResponse(status_code=201, content={"detail": "New subscriber created successfully"})


def subscriber_register_service(
    subscriber_data: SubscriberRegister,
    session: Session
):
    track_code = generate_random_code(6)
    subscriber = Subscriber(
        first_name=subscriber_data.first_name,
        last_name=subscriber_data.last_name,
        mobile=subscriber_data.mobile,
        postal_code=subscriber_data.postal_code,
        status="پیش ثبت نام آنلاین",
        subscriber_code=track_code
    )
    
    session.add(subscriber)
    session.commit()
    return JSONResponse(status_code=201, content={"track_code": track_code})


def update_subscriber_service(
    subscriber_id: int,
    subscriber_data: SubscriberCreateSchema,
    session: Session
):
    subscriber = session.get(Subscriber, subscriber_id)
    if not subscriber:
        raise HTTPException(status_code=404, detail="Subscriber is not found")
    
    province_changed = subscriber_data.province_id != subscriber.province_id
    city_changed = subscriber_data.city_id != subscriber.city_id
    if province_changed or city_changed:
        valid_province_city_id(subscriber_data.province_id, subscriber_data.city_id)
        
    for field, value in subscriber_data.model_dump().items():
        setattr(subscriber, field, value)
        
    if len(subscriber.subscriber_code) < 10:
        subs_code = generate_random_code(10)
        subscriber.subscriber_code = subs_code
        subscriber.status = "پیش ثبت نام"
    
    session.commit()
    return JSONResponse(status_code=200, content={"detail": "Subscriber updated successfully"})

def get_subscriber_detail(
    subscriber_id: int,
    session: Session
):
    subscriber = session.get(Subscriber, subscriber_id)
    if not subscriber:
        raise HTTPException(status_code=404, detail="Subscriber not found")
    
    return subscriber

SEARCHABLE_FIELDS = {
    "first_name": Subscriber.first_name,
    "last_name": Subscriber.last_name,
    "national_id": Subscriber.national_id,
    "phone": Subscriber.phone,
    "subscriber_code": Subscriber.subscriber_code
}

def get_subscribers_list(
    query: str | None,
    field: str | None,
    session: Session
):
    if field is None or query is None or field not in SEARCHABLE_FIELDS:
        return [
            SubscriberListSchema(
                id=sub.id,
                first_name=sub.first_name,
                last_name=sub.last_name,
                national_id=sub.national_id,
                subscriber_code=sub.subscriber_code,
                status=sub.status
            )
            for sub in session.exec(select(Subscriber).order_by(desc(Subscriber.id))).all()
        ]
    
    column = SEARCHABLE_FIELDS[field]
    # return session.exec(select(Subscriber).where(column.ilike(f"%{query}%"))).all()
    return [
            SubscriberViewSchema(
                id=sub.id, first_name=sub.first_name, last_name=sub.last_name,
                national_id=sub.national_id, phone=sub.phone, status=sub.status,
                province=PROVINCE_MAP[sub.province_id].name, city=CITY_MAP[sub.city_id].name, 
                birth_date=sub.birth_date, father_name=sub.father_name,
                certificate_number=sub.certificate_number, mobile=sub.mobile,
                area=sub.area, alley=sub.alley, building_name=sub.building_name, 
                house_number=sub.house_number, main_street=sub.main_street, 
                postal_code=sub.postal_code, side_street=sub.side_street,
                subscriber_type=sub.subscriber_type, subscriber_code=sub.subscriber_code
            )
            for sub in session.exec(select(Subscriber).where(column.ilike(f"%{query}%"))).all()
        ]
    
    

def remove_subscriber_service(
    subscriber_id: int,
    session: Session
):
    subscriber = session.get(Subscriber, subscriber_id)
    if not subscriber:
        raise HTTPException(status_code=404, detail="Subscriber not found")
    
    session.delete(subscriber)
    session.commit()
    return JSONResponse(status_code=200, content={"detail": "Subscriber removed successfully"})

SEARCHABLE_FIELDS_ADV = {
    "full_name": func.concat(Subscriber.first_name, " ",Subscriber.last_name),
    "national_id": Subscriber.national_id,
    "mobile": Subscriber.mobile,
    "phone": Subscriber.phone,
    "province": "province",
    "city": "city"
}

def search_subscribers_service(
    query: str,
    field: str,
    session: Session
):
    if field not in SEARCHABLE_FIELDS_ADV:
        return []
    
    if field == "province":
        ids = search_province_ids(query)
        if not ids:
            return []
        return session.exec(select(Subscriber).where(Subscriber.province_id.in_(ids))).all()
    
    if field == "city":
        ids = search_city_ids(query)
        if not ids:
            return []
        return session.exec(select(Subscriber).where(Subscriber.city_id.in_(ids))).all()

    column = SEARCHABLE_FIELDS[field]
    return session.exec(select(Subscriber).where(column.ilike(f"%{query}%"))).all()