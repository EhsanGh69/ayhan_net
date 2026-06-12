from fastapi import HTTPException
from fastapi.responses import JSONResponse
from sqlmodel import Session, select, and_, desc
from typing import Optional

from app.models import Subscriber, Corporation, Province, City, Area
from app.core.security import generate_random_code
from app.schemas.subscriber_schema import (
    SubscriberCreateUpdateSchema, SubscriberViewSchema, SubscriberRegister,
    CheckSubscriberExist, CorporationSchema
)


def subs_exist_query(subscriber_id: int, session: Session):
    subscriber = session.get(Subscriber, subscriber_id)
    if not subscriber:
        raise HTTPException(status_code=404, detail="Subscriber is not found")
    return subscriber
    

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
    session: Session,
    subs_data: SubscriberCreateUpdateSchema,
    corporate_data: Optional[CorporationSchema] = None,
):  
    subs_code = generate_random_code(10)
    subscriber = Subscriber(
        **subs_data.model_dump(), 
        status="پیش ثبت نام",
        subscriber_code=subs_code
    )
    
    session.add(subscriber)
    session.flush()

    if subscriber.subscriber_type == 'legal' and corporate_data:
        corporate = Corporation(
            **corporate_data.model_dump(), 
            subscriber_id=subscriber.id
        )
        session.add(corporate)

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
    session: Session,
    subscriber_id: int,
    subscriber_data: SubscriberCreateUpdateSchema,
    corporate_data: Optional[CorporationSchema] = None,
):
    subscriber = subs_exist_query(subscriber_id, session)
        
    for field, value in subscriber_data.model_dump().items():
        setattr(subscriber, field, value)

        
    if subscriber.subscriber_code and len(subscriber.subscriber_code) < 10:
        subs_code = generate_random_code(10)
        subscriber.subscriber_code = subs_code
        subscriber.status = "پیش ثبت نام"

    if subscriber_data.subscriber_type == 'legal' and corporate_data:
        corporate = session.exec(
            select(Corporation).where(Corporation.subscriber_id == subscriber_id)
        ).first()
        if corporate:
            for field, value in corporate_data.model_dump().items():
                setattr(corporate, field, value)
        else:
            corporate = Corporation(
                **corporate_data.model_dump(), 
                subscriber_id=subscriber.id
            )
            session.add(corporate)
    
    session.commit()
    return JSONResponse(status_code=200, content={"detail": "Subscriber updated successfully"})

def get_subscriber_detail(
    subscriber_id: int,
    session: Session
):
    subscriber = subs_exist_query(subscriber_id, session)
    
    subs_type = subscriber.subscriber_type
    
    if subs_type and subs_type == 'legal':
        corporate = session.exec(
            select(Corporation).where(Corporation.subscriber_id == subscriber_id)
        ).first()
        if not corporate:
            raise HTTPException(status_code=404, detail="Corporation not found")
        
        sub_dict = {c.name: getattr(subscriber, c.name) for c in subscriber.__table__.columns}
        corp_dict = {c.name: getattr(corporate, c.name) for c in corporate.__table__.columns}
    
        return {**sub_dict, **{
                "corporate_name": corp_dict["name"], 
                "registration_number": corp_dict["registration_number"], 
                "corporate_national_id": corp_dict["national_id"]
            }
        }
    
    return subscriber


def get_subscribers_list(session: Session):
    return session.exec(select(Subscriber).order_by(desc(Subscriber.id))).all()


def sub_location_query(location: str, location_id: int, session: Session):
    if not location_id: 
        return None
    if location == "province":
        sub_province = session.get(Province, location_id)
        return sub_province.name if sub_province else None
    elif location == "city":
        sub_city = session.get(City, location_id)
        return sub_city.name if sub_city else None
    elif location == "area":
        sub_area = session.get(Area, location_id)
        return sub_area.name if sub_area else None


SEARCHABLE_FIELDS = {
    "first_name": Subscriber.first_name,
    "last_name": Subscriber.last_name,
    "national_id": Subscriber.national_id,
    "phone": Subscriber.phone,
    "subscriber_code": Subscriber.subscriber_code
}

def search_subscribers_service(
    query: str,
    field: str,
    session: Session
):
    column = SEARCHABLE_FIELDS[field]
    return [
        SubscriberViewSchema(
            id=sub.id, first_name=sub.first_name, last_name=sub.last_name,
            national_id=sub.national_id, phone=sub.phone, status=sub.status,
            birth_date=sub.birth_date, father_name=sub.father_name,
            certificate_number=sub.certificate_number, mobile=sub.mobile,
            province=(sub_location_query("province", sub.province_id, session)), 
            city=(sub_location_query("city", sub.city_id, session)), 
            area=(sub_location_query("area", sub.area, session)),
            alley=sub.alley, building_name=sub.building_name, 
            house_number=sub.house_number, main_street=sub.main_street, 
            postal_code=sub.postal_code, side_street=sub.side_street,
            subscriber_type=sub.subscriber_type, subscriber_code=sub.subscriber_code,
            floor=sub.floor, side_alley=sub.side_alley,unit=sub.unit,
            corporate_name=(None if not sub.subscriber_type or sub.subscriber_type == 'real' 
                            else sub.corporation.name),
            registration_number=(None if not sub.subscriber_type or sub.subscriber_type == 'real' 
                                 else sub.corporation.registration_number),
            corporate_national_id=(None if not sub.subscriber_type or sub.subscriber_type == 'real' 
                                   else sub.corporation.national_id),
            
        )
        for sub in session.exec(select(Subscriber).where(column.ilike(f"%{query}%"))).all()
    ]
    

def remove_subscriber_service(
    subscriber_id: int,
    session: Session
):
    subscriber = subs_exist_query(subscriber_id, session)
    
    if subscriber.subscriber_type == 'legal':
        corporate = session.exec(
            select(Corporation).where(Corporation.subscriber_id == subscriber_id)
        )
        session.delete(corporate)
    
    session.delete(subscriber)
    session.commit()
    return JSONResponse(status_code=200, content={"detail": "Subscriber removed successfully"})
