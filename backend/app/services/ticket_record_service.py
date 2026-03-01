from fastapi import HTTPException
from fastapi.responses import JSONResponse
from sqlmodel import Session, select, and_, desc

from app.models import TicketGroup, Ticket, TicketRecord, Subscriber, Staff
from app.schemas.ticket_record_schema import TicketRecordCreate, TicketChangeStaff, TicketRecordResponse


def create_ticket_validation(data: TicketRecordCreate, session: Session, is_response: bool = False):
    if not is_response:
        subs_exist = session.get(Subscriber, data.subscriber_id)
        if not subs_exist:
            raise HTTPException(status_code=404, detail="Subscriber not found")
    
    user_exist = session.get(Staff, data.user_id)
    if not user_exist:
        raise HTTPException(status_code=404, detail="User not found")
    
    if data.staff_id:
        staff_exist = session.get(Staff, data.staff_id)
        if not staff_exist:
            raise HTTPException(status_code=404, detail="Staff not found")
        

def check_record_exist(record_id: int, session: Session):
    ticket_record = session.get(TicketRecord, record_id)
    if not ticket_record:
        raise HTTPException(status_code=404, detail="Ticket record not found")
    return ticket_record

def generate_ticket_data(data: TicketRecordCreate, is_response: bool = False):
    ticket_data = {
        'group': data.group,
        'name': data.name,
        'content': data.content,
        'user_id': data.user_id,
        'status': data.status,
        'is_active': True
    }
    if data.staff_id:
        ticket_data['staff_id'] = data.staff_id
    if not is_response:
        ticket_data['subscriber_id'] = data.subscriber_id
    
    return ticket_data


def create_ticket_record_service(
    data: TicketRecordCreate,
    session: Session
):  
    create_ticket_validation(data, session)
    ticket_data = generate_ticket_data(data)
    ticket_record = TicketRecord(**ticket_data)
    session.add(ticket_record)
    session.commit()
    return JSONResponse(status_code=201, content={"detail": "Ticket record created successfully"})


def response_ticket_record_service(
    record_id: int,
    data: TicketRecordCreate,
    session: Session
):
    ticket_record = check_record_exist(record_id, session)
    create_ticket_validation(data, session, is_response=True)
    ticket_data = generate_ticket_data(data, is_response=True)
    ticket_response = TicketRecord(
                        **ticket_data, 
                        subscriber_id=ticket_record.subscriber_id, 
                        parent_ticket_id=record_id
                    )
    ticket_record.status = "close"
    session.add(ticket_response)
    session.commit()
    return JSONResponse(status_code=201, content={"detail": "Response ticket created successfully"})
    

def tickets_in_group_service(group_id: int, session: Session):
    group_exist = session.get(TicketGroup, group_id)
    if not group_exist:
        raise HTTPException(status_code=404, detail="Ticket group not found")
    return session.exec(select(Ticket).where(Ticket.group_id == group_id)).all()


def ticket_records_list_service(session: Session):
    return session.exec(select(TicketRecord).where(TicketRecord.status == 'open')).all()


def ticket_record_detail_service(record_id: int, session: Session):
    return check_record_exist(record_id, session)


def change_ticket_record_activate_service(record_id: int, session: Session):
    ticket_record = check_record_exist(record_id, session)
    current_activate = ticket_record.is_active
    ticket_record.is_active = not current_activate
    session.commit()
    return JSONResponse(status_code=200, content={"detail": "Ticket record activate changed successfully"})


def subscriber_ticket_records_service(subs_id: id, session: Session):
    subs_exist = session.get(Subscriber, subs_id)
    if not subs_exist:
        raise HTTPException(status_code=404, detail="Subscriber not found")
    return session.exec(
        select(TicketRecord).where(TicketRecord.subscriber_id == subs_id)
    ).all()


def staff_ticket_records_service(staff_id: int, session: Session):
    return session.exec(
        select(TicketRecord).where(
            and_(TicketRecord.staff_id == staff_id, TicketRecord.status == 'open')
        )
    ).all()


def ticket_cartable_staffs_service(session: Session):
    return session.exec(select(Staff).order_by(Staff.id)).all()
    # return session.exec(select(Staff).order_by(desc(Staff.id))).all()


def ticket_record_change_staff_service(
    record_id: int, 
    data: TicketChangeStaff,
    session: Session
):
    ticket_record = check_record_exist(record_id, session)
    staff_exist = session.get(Staff, data.staff_id)
    if not staff_exist:
        raise HTTPException(status_code=404, detail="Staff not found")
    
    ticket_record.staff_id = data.staff_id
    session.commit()
    return JSONResponse(status_code=200, content={"detail": "Ticket record staff changed successfully"})


def close_ticket_record_service(record_id: int, session: Session):
    ticket_record = check_record_exist(record_id, session)
    ticket_record.status = "open"
    session.commit()
    return JSONResponse(status_code=200, content={"detail": "Ticket record closed successfully"})


    