from fastapi import APIRouter, Depends
from sqlmodel import Session
from typing import List

from app.db.session import get_session
from app.core.dependencies import verify_access
from app.schemas.ticket_schema import (
    TicketCreateSchema, TicketUpdateSchema, TicketViewSchema, AddTicketGroup
)
from app.services.ticket_service import (
    create_ticket_service, update_ticket_service, remove_ticket_service, tickets_list_service,
    ticket_detail_service, add_ticket_group_service, group_tickets_list_service,
    update_ticket_group_service
)


router = APIRouter(prefix="/api/tickets", tags=['Tickets'])


@router.post('/groups')
def add_ticket_group(
    data: AddTicketGroup,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return add_ticket_group_service(data, session)

@router.put('/groups/{group_id}')
def update_ticket_group(
    group_id: int,
    data: AddTicketGroup,
    # auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return update_ticket_group_service(group_id, data, session)


@router.get('/groups')
def ticket_groups_list(
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return group_tickets_list_service(session)


@router.post('/')
def create_ticket(
    data: TicketCreateSchema,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return create_ticket_service(data, session)


@router.put('/{ticket_id}')
def update_ticket(
    ticket_id: int,
    data: TicketUpdateSchema,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return update_ticket_service(ticket_id, data, session)


@router.delete('/{ticket_id}')
def remove_ticket(
    ticket_id: int,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return remove_ticket_service(ticket_id, session)


@router.get('/', response_model=List[TicketViewSchema])
def tickets_list(
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return tickets_list_service(session)


@router.get('/{ticket_id}', response_model=TicketViewSchema)
def tickets_detail(
    ticket_id: int,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return ticket_detail_service(ticket_id, session)



