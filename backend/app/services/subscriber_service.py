from fastapi import HTTPException
from sqlmodel import Session, select

from app.models import Subscriber
from app.schemas.subscriber_schema import SubscriberBaseSchema, SubscriberListSchema
from app.services.provinces_loader import PROVINCE_CITY_IDS, PROVINCE_MAP, CITY_MAP

    
def valid_province_city_id(province_id, city_id):
    city_ids = PROVINCE_CITY_IDS.get(province_id)
    if not city_ids:
        raise HTTPException(status_code=422, detail="Province id is not valid")
    
    if city_id not in city_ids:
        raise HTTPException(status_code=422, detail="City id is not valid")


def create_subscriber_service(
    subscriber_data: SubscriberBaseSchema,
    session: Session
):
    valid_province_city_id(subscriber_data.province_id, subscriber_data.city_id)
    phone_exist = session.exec(
        select(Subscriber).where(Subscriber.phone == subscriber_data.phone)
    ).first()
    if(phone_exist):
        raise HTTPException(status_code=409, detail="مشترکی با شماره ثابت وارد شده از قبل وجود دارد")
    
    subscriber = Subscriber(**subscriber_data.model_dump(), status="پیش ثبت نام")
    
    session.add(subscriber)
    session.commit()
    session.refresh(subscriber)
    return subscriber


def update_subscriber_service(
    subscriber_id: int,
    subscriber_data: SubscriberBaseSchema,
    session: Session
):
    subscriber = session.get(Subscriber, subscriber_id)
    if not subscriber:
        raise HTTPException(status_code=404, detail="Subscriber is not found")
    
    province_changed = subscriber_data.province_id != subscriber.province_id
    city_changed = subscriber_data.city_id != subscriber.city_id
    if province_changed or city_changed:
        valid_province_city_id(subscriber_data.province_id, subscriber_data.city_id)
 
    if subscriber.phone != subscriber_data.phone:
        phone_exist = session.exec(
            select(Subscriber).where(Subscriber.phone == subscriber_data.phone)
        ).first()
        
        if(phone_exist):
            raise HTTPException(status_code=409, detail="مشترکی با شماره ثابت وارد شده از قبل وجود دارد")
        
    for field, value in subscriber_data.model_dump().items():
        setattr(subscriber, field, value)
    
    session.commit()
    session.refresh(subscriber)
    return subscriber

def get_subscriber_detail(
    subscriber_id: int,
    session: Session
):
    subscriber = session.get(Subscriber, subscriber_id)
    if not subscriber:
        raise HTTPException(status_code=404, detail="")
    
    return subscriber


def get_subscribers_list(session: Session):
    subscribers = session.exec(select(Subscriber)).all()
    return [
        SubscriberListSchema(
            id=sub.id,
            first_name=sub.first_name,
            last_name=sub.last_name,
            mobile=sub.mobile,
            phone=sub.phone,
            province=PROVINCE_MAP[sub.province_id].name,
            city=CITY_MAP[sub.city_id].name, 
            status=sub.status
        )
        for sub in subscribers
    ]