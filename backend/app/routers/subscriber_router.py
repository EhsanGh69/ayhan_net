from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlmodel import Session

from app.db.session import get_session
from app.core.dependencies import verify_access
from app.schemas.subscriber_schema import SubscriberBaseSchema, SubscriberDetailSchema
from app.services.subscriber_service import (
    create_subscriber_service, update_subscriber_service, get_subscribers_list, get_subscriber_detail,
    remove_subscriber_service,
)

router = APIRouter(prefix="/api/subscribers", tags=['Subscribers'])


@router.post("/")
def create_subscriber(
    data: SubscriberBaseSchema,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    create_subscriber_service(data, session)
    return JSONResponse(status_code=201, content={"detail": "New subscriber created successfully"})


@router.put("/{subscriber_id}")
def update_subscriber(
    subscriber_id: int,
    data: SubscriberBaseSchema,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    update_subscriber_service(subscriber_id, data, session)
    return JSONResponse(status_code=200, content={"detail": "Subscriber updated successfully"})


@router.get('/')
def subscribers_list(
    query: str | None=None,
    field: str | None=None, 
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return get_subscribers_list(query, field, session)

@router.get('/{subscriber_id}', response_model=SubscriberDetailSchema)
def subscriber_detail(
    subscriber_id: int,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return get_subscriber_detail(subscriber_id, session)

@router.delete('/{subscriber_id}')
def remove_subscriber(
    subscriber_id: int,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return remove_subscriber_service(subscriber_id, session)



