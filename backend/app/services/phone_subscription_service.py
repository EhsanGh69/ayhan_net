import os
from datetime import datetime
from fastapi import HTTPException, UploadFile
from fastapi.responses import JSONResponse, FileResponse
from sqlmodel import Session, select, desc, and_

from app.models import PhoneSubscription, Subscriber, NationalIdImage
from app.schemas.phone_subscription_schema import ChangeStatusSchema, ChangeTechSchema, NewApplicantSchema
from app.core.file_management import image_validation, save_file
from app.services.subscriber_service import subs_exist_query


MEDIA_ROOT = "app/media/nid_images"


def get_unknown_phone_subscriptions_service(session: Session):
    subquery = select(PhoneSubscription).where(
        PhoneSubscription.subscriber_id == Subscriber.id
    ).exists()
    return session.exec(select(Subscriber).where(~subquery).order_by(desc(Subscriber.id))).all()


def new_applicant_upload_nid_image_service(
    subscriber_id: int,
    nid_image: UploadFile,
    session: Session
):
    subs_exist_query(subscriber_id, session)
    nid_image_exist = session.exec(
        select(NationalIdImage).where(NationalIdImage.subscriber_id == subscriber_id)
    ).first()
    
    image_validation(nid_image)
    
    if nid_image_exist:
        raise HTTPException(status_code=409, detail="NationalId image already uploaded")
    else:
        phone_subs = PhoneSubscription(subscriber_id=subscriber_id, phone_sub_status="متقاضی جدید")
        session.add(phone_subs)
        
        nid_image_obj = NationalIdImage(
            subscriber_id=subscriber_id, 
            nid_image=save_file(nid_image, MEDIA_ROOT)
        )
        session.add(nid_image_obj)
        
    session.commit()
    return JSONResponse(
        status_code=200, content={"detail": "National ID image uploaded successfully"}
    )

def check_sip_data(data: ChangeTechSchema):
    sip_data = [
        data.user_sip_phone, 
        data.pass_sip_phone, 
        data.ip_sip_phone
    ]
    if None in sip_data:
        raise HTTPException(status_code=422, detail="Sip data is required")


def change_phone_subscription_status_service(
    subscriber_id: int,
    subscription_data: ChangeStatusSchema,
    session: Session
):
    subs_exist_query(subscriber_id, session)
    phone_subs_exist = session.exec(select(PhoneSubscription).where(
        PhoneSubscription.subscriber_id == subscriber_id
    )).first()
    
    if phone_subs_exist:
        raise HTTPException(
            status_code=409, detail="Phone subscription already changed"
        )
        
    if subscription_data.phone_type == "PSTN":
        status = "در انتظار تغییر تکنولوژی"
    else:
        check_sip_data(subscription_data)
        status = "در انتظار دایری"
        
    phone_subs = PhoneSubscription(
        **subscription_data.model_dump(),
        phone_sub_status=status,
        subscriber_id=subscriber_id
    )
    
    session.add(phone_subs)
    session.commit()
    return JSONResponse(
        status_code=201, content={"detail": "Phone subscription status changed successfully"}
    )
    

def change_tech_list_service(session: Session):
    return session.exec(
        select(PhoneSubscription).where(
            PhoneSubscription.phone_sub_status == "در انتظار تغییر تکنولوژی"
        ).order_by(desc(PhoneSubscription.id))
    ).all()
    

def change_tech_action_service(
    subscriber_id: int,
    tech_data: ChangeTechSchema,
    session: Session
):
    subs_exist_query(subscriber_id, session)
    subscription = session.exec(
        select(PhoneSubscription).where(
            and_(
                PhoneSubscription.subscriber_id == subscriber_id,
                PhoneSubscription.phone_type == 'PSTN'
            )
        )
    ).first()
    
    if not subscription:
        raise HTTPException(status_code=404, detail="Phone subscription not found")
    
    subscription.phone_sub_status = "در انتظار دایری"
    subscription.phone_type = "Sip Phone"
    subscription.user_sip_phone = tech_data.user_sip_phone
    subscription.pass_sip_phone = tech_data.pass_sip_phone
    subscription.ip_sip_phone = tech_data.ip_sip_phone
    
    session.commit()
    return JSONResponse(
        status_code=200, content={"detail": "Phone subscription tech changed successfully"}
    )


def new_applicant_list_service(session: Session):
    return session.exec(
        select(PhoneSubscription).where(
            PhoneSubscription.phone_sub_status == "متقاضی جدید"
        ).order_by(desc(PhoneSubscription.id))
    ).all()


def check_new_applicant(subscriber_id: int,session: Session):
    subscription = session.exec(
        select(PhoneSubscription).where(
            and_(
                PhoneSubscription.subscriber_id == subscriber_id,
                PhoneSubscription.phone_sub_status == 'متقاضی جدید'
            )
        )
    ).first()
    
    if not subscription:
        raise HTTPException(status_code=404, detail="Phone subscription not found")
    
    return subscription
    

def new_applicant_action_service(
    subscriber_id: int,
    applicant_data: NewApplicantSchema,
    session: Session
):
    subs_exist_query(subscriber_id, session)
    subscription = check_new_applicant(subscriber_id, session)
    subscription.file_number = applicant_data.file_number
    subscription.phone_number = applicant_data.phone_number
    subscription.phone_type = applicant_data.phone_type
    
    if applicant_data.phone_type == 'Sip Phone':
        check_sip_data(applicant_data)
        subscription.phone_sub_status = "در انتظار دایری"
        subscription.user_sip_phone = applicant_data.user_sip_phone
        subscription.pass_sip_phone = applicant_data.pass_sip_phone
        subscription.ip_sip_phone = applicant_data.ip_sip_phone
    else:
        subscription.phone_sub_status = "در انتظار تغییر تکنولوژی"
    
    session.commit()
    return JSONResponse(
        status_code=200, content={"detail": "New applicant subscription registered successfully"}
    )
    
    
def new_applicant_download_nid_image_service(
    subscriber_id: int,
    session: Session
):
    subscriber = subs_exist_query(subscriber_id, session)
    check_new_applicant(subscriber_id, session)
    nid_file = session.exec(
        select(NationalIdImage).where(NationalIdImage.subscriber_id == subscriber_id)
    ).first()
    if not nid_file:
        raise HTTPException(status_code=404, detail="فایل تصویر یافت نشد")
    
    file_path = os.path.join(MEDIA_ROOT, nid_file.nid_image)
    
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="فایل تصویر یافت نشد")
    
    now_date = datetime.now().strftime("%Y%m%d_%H%M%S")
    return FileResponse(
        path=file_path,
        filename=f'{subscriber.first_name}_{subscriber.last_name}_{now_date}',
        media_type="image/jpg"
    )


def waiting_establish_list_service(session: Session):
    return session.exec(
        select(PhoneSubscription).where(
            PhoneSubscription.phone_sub_status == "در انتظار دایری"
        ).order_by(desc(PhoneSubscription.id))
    ).all()


    
