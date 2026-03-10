from fastapi import APIRouter, Depends
from sqlmodel import Session
from typing import List

from app.db.session import get_session
from app.core.dependencies import verify_access
from app.schemas.ticket_record_schema import (
    TicketRecordCreate, TicketRecordList, TicketRecordDetail, TicketChangeStaff, TicketRecordResponse
)
from app.schemas.staff_schema import CurrentStaffSchema
from app.services.ticket_record_service import (
    create_ticket_record_service, tickets_in_group_service, ticket_records_list_service,
    ticket_record_detail_service, subscriber_ticket_records_service, ticket_cartable_staffs_service,
    close_ticket_record_service, remove_ticket_record_service, staff_ticket_records_service,
    ticket_record_change_staff_service, response_ticket_record_service
)


router = APIRouter(prefix="/api/ticket-records", tags=["TicketRecords"])

@router.get('/staffs', response_model=List[CurrentStaffSchema])
def ticket_cartable_staffs(
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return ticket_cartable_staffs_service(session)

@router.get('/staffs/{staff_id}', response_model=List[TicketRecordList])
def staff_ticket_records(
    staff_id: int,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return staff_ticket_records_service(staff_id, session)

@router.patch('/staffs/change/{record_id}')
def ticket_record_change_staff(
    record_id: int,
    data: TicketChangeStaff,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return ticket_record_change_staff_service(record_id, data, session)

@router.post('/')
def create_ticket_record(
    data: TicketRecordCreate,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return create_ticket_record_service(data, session)

@router.post('/response/{record_id}')
def response_ticket_record(
    record_id: int,
    data: TicketRecordResponse,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return response_ticket_record_service(record_id, data, session)

@router.get('/groups/{group_id}')
def tickets_in_group(
    group_id: int,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return tickets_in_group_service(group_id, session)

@router.get('/', response_model=List[TicketRecordList])
def ticket_records_list(
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return ticket_records_list_service(session)

@router.get('/{record_id}', response_model=TicketRecordDetail)
def ticket_record_detail(
    record_id: int,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return ticket_record_detail_service(record_id, session)

@router.delete('/{record_id}')
def remove_ticket_record(
    record_id: int,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return remove_ticket_record_service(record_id, session)

@router.get('/subscribers/{subs_id}', response_model=List[TicketRecordList])
def subscriber_ticket_records(
    subs_id: int,
    auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return subscriber_ticket_records_service(subs_id, session)


@router.get('/close/{record_id}')
def close_ticket_record(
    record_id: int,
    # auth_user: int = Depends(verify_access),
    session: Session = Depends(get_session)
):
    return close_ticket_record_service(record_id, session)



