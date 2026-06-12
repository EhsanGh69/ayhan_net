from fastapi import APIRouter, Depends
from sqlmodel import Session
from typing import Optional, List

from app.db.session import get_session
from app.core.dependencies import verify_access
from app.core.error_handler import handle_errors
from app.schemas.subscriber_schema import (
    SubscriberCreateUpdateSchema, SubscriberRegister, CheckSubscriberExist,
    SubscriberListSchema, CorporationSchema
)
from app.services.subscriber_service import (
    create_subscriber_service, update_subscriber_service, get_subscribers_list, get_subscriber_detail,
    remove_subscriber_service, subscriber_register_service, check_subs_exist_service,
    search_subscribers_service
)

router = APIRouter(prefix="/api/subscribers", tags=['Subscribers'])


@router.post("/exist")
@handle_errors
def check_subs_exist(
    data: CheckSubscriberExist,
    session: Session = Depends(get_session)
):
    return check_subs_exist_service(data, session)

@router.post("/register")
@handle_errors
def register_subscriber(
    data: SubscriberRegister,
    session: Session = Depends(get_session)
):
    return subscriber_register_service(data, session)


@router.post("/")
@handle_errors
def create_subscriber(
    subs_data: SubscriberCreateUpdateSchema,
    corporate_data: Optional[CorporationSchema] = None,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    
    return create_subscriber_service(session, subs_data, corporate_data)


@router.put("/{subscriber_id}")
@handle_errors
def update_subscriber(
    subscriber_id: int,
    subs_data: SubscriberCreateUpdateSchema,
    corporate_data: Optional[CorporationSchema] = None,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return update_subscriber_service(session, subscriber_id, subs_data, corporate_data)


@router.get('/', response_model=List[SubscriberListSchema])
@handle_errors
def subscribers_list(
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return get_subscribers_list(session)


@router.get('/search')
@handle_errors
def subscribers_search(
    query: str,
    field: str, 
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return search_subscribers_service(query, field, session)


@router.get('/{subscriber_id}')
@handle_errors
def subscriber_detail(
    subscriber_id: int,
    # auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return get_subscriber_detail(subscriber_id, session)

@router.delete('/{subscriber_id}')
@handle_errors
def remove_subscriber(
    subscriber_id: int,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return remove_subscriber_service(subscriber_id, session)



