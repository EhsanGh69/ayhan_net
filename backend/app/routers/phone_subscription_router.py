from fastapi import APIRouter, Depends, UploadFile, File
from sqlmodel import Session
from typing import List

from app.db.session import get_session
from app.core.error_handler import handle_errors
from app.core.dependencies import verify_access
from app.schemas.subscriber_schema import SubscriberListSchema
from app.schemas.phone_subscription_schema import (
    ChangeStatusSchema, ChangeTechSchema, ChangeTechList, NewApplicantList, NewApplicantSchema
)
from app.services.phone_subscription_service import (
    get_unknown_phone_subscriptions_service, new_applicant_upload_nid_image_service,
    change_phone_subscription_status_service, change_tech_list_service,
    change_tech_action_service, new_applicant_list_service, new_applicant_action_service,
    new_applicant_download_nid_image_service, waiting_establish_list_service
)

router = APIRouter(prefix="/api/subscriptions/phone", tags=["PhoneSubscription"])


@router.get('/unknown', response_model=List[SubscriberListSchema])
@handle_errors
def get_unknown_phone_subscriptions(
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return get_unknown_phone_subscriptions_service(session)


@router.post('/new-applicant/{subscriber_id}')
@handle_errors
def new_applicant_upload_nid_image(
    subscriber_id: int,
    nid_image: UploadFile = File(None),
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return new_applicant_upload_nid_image_service(subscriber_id, nid_image, session)


@router.post('/change-status/{subscriber_id}')
@handle_errors
def change_phone_subscription_status(
    subscriber_id: int,
    subscription_data: ChangeStatusSchema,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    print(subscription_data.model_dump())
    return change_phone_subscription_status_service(subscriber_id, subscription_data, session)


@router.get('/change-tech/list', response_model=List[ChangeTechList])
@handle_errors
def change_tech_list(
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return change_tech_list_service(session)


@router.put('/change-tech/action/{subscriber_id}')
@handle_errors
def change_tech_action(
    subscriber_id: int,
    tech_data: ChangeTechSchema,
    # auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return change_tech_action_service(subscriber_id, tech_data, session)


@router.get('/new-applicant/list', response_model=List[NewApplicantList])
@handle_errors
def new_applicant_list(
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return new_applicant_list_service(session)


@router.put('/new-applicant/action/{subscriber_id}')
@handle_errors
def new_applicant_action(
    subscriber_id: int,
    applicant_data: NewApplicantSchema,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return new_applicant_action_service(subscriber_id, applicant_data, session)


@router.get('/new-applicant/nid-image/{subscriber_id}')
@handle_errors
def new_applicant_download_nid_image(
    subscriber_id: int,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return new_applicant_download_nid_image_service(subscriber_id, session)


@router.get('/waiting-establish/list', response_model=List[ChangeTechList])
@handle_errors
def waiting_establish_list(
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return waiting_establish_list_service(session)



