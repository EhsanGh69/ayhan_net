from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlmodel import Session
from typing import List

from app.db.session import get_session
from app.core.dependencies import verify_access
from app.schemas.subscriber_schema import (
    SubscriberBaseSchema, SubscriberDetailSchema, SubscriberListSchema
)
from app.services.subscriber_service import (
    create_subscriber_service, update_subscriber_service, get_subscribers_list, get_subscriber_detail
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


@router.get('/', response_model=List[SubscriberListSchema])
def subscribers_list(
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return get_subscribers_list(session)

@router.get('/{subscriber_id}')
def subscriber_detail(
    subscriber_id: int,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return get_subscriber_detail(subscriber_id, session)




