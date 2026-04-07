from fastapi import HTTPException
from fastapi.responses import JSONResponse
from sqlmodel import Session, select, and_

from app.models import TicketGroup, Ticket
from app.schemas.ticket_schema import TicketCreateSchema, TicketUpdateSchema, AddTicketGroup


def add_ticket_group_service(
    group_data: AddTicketGroup,
    session: Session
):
    group_title = group_data.title.strip()
    group_exist = session.exec(select(TicketGroup).where(TicketGroup.title == group_title)).first()
    if group_exist:
        raise HTTPException(status_code=409, detail="گروهی با این عنوان از قبل موجود است")
    
    ticket_group = TicketGroup(title=group_title)
    session.add(ticket_group)
    session.commit()
    return JSONResponse(status_code=201, content={"detail": "Ticket group created successfully"})


def update_ticket_group_service(
    group_id: int,
    group_data: AddTicketGroup,
    session: Session
):
    group_ticket = session.get(TicketGroup, group_id)
    if not group_ticket:
        raise HTTPException(status_code=404, detail="Ticket group not found")
    group_title = group_data.title.strip()
    group_exist = session.exec(select(TicketGroup).where(TicketGroup.title == group_title)).first()
    if group_exist:
        raise HTTPException(status_code=409, detail="گروهی با این عنوان از قبل موجود است")
    
    setattr(group_ticket, "title", group_title)
    session.commit()
    return JSONResponse(status_code=200, content={"detail": "Ticket group updated successfully"})


def create_ticket_service(
    ticket_data: TicketCreateSchema,
    session: Session
):
    group_ticket = session.get(TicketGroup, ticket_data.group_id)
    if not group_ticket:
        raise HTTPException(status_code=404, detail="Ticket group not found")
    
    name_exist = session.exec(
        select(Ticket).where(
            and_(Ticket.group_id == ticket_data.group_id, Ticket.name == ticket_data.name.strip())
        )
    ).first()
    if name_exist:
        raise HTTPException(status_code=409, detail="در این گروه تیکتی با این نام وجود دارد")
    
    ticket = Ticket(
        group_id=group_ticket.id, name=ticket_data.name, description=ticket_data.description
    )
    
    session.add(ticket)
    session.commit()
    return JSONResponse(status_code=201, content={"detail": "Ticket created successfully"})


def update_ticket_service(
    ticket_id: int,
    ticket_data: TicketUpdateSchema,
    session: Session
):
    ticket = session.get(Ticket, ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
   
    group_ticket = session.get(TicketGroup, ticket_data.group_id)
    if not group_ticket:
        raise HTTPException(status_code=404, detail="Ticket group not found")
    
    if ticket_data.name.strip() != ticket.name:
        name_exist = session.exec(
            select(Ticket).where(
                and_(Ticket.group_id == ticket_data.group_id, Ticket.name == ticket_data.name.strip())
        )).first()
        if name_exist:
            raise HTTPException(status_code=409, detail="در این گروه تیکتی با این نام وجود دارد")
    
    for field, value in ticket_data.model_dump().items():
        setattr(ticket, field, value)

    session.commit()
    return JSONResponse(status_code=200, content={"detail": "Ticket updated successfully"})


def change_ticket_activate_service(
    ticket_id: int,
    session: Session
): 
    ticket = session.exec(select(Ticket).where(Ticket.id == ticket_id)).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    
    current_activate = ticket.is_active
    ticket.is_active = not current_activate
    session.commit()
    return JSONResponse(status_code=200, content={"detail": "Ticket activate changed successfully"})


def tickets_list_service(session: Session):
    return session.exec(select(Ticket)).all()


def group_tickets_list_service(session: Session):
    return session.exec(select(TicketGroup)).all()


def ticket_detail_service(
    ticket_id: int,
    session: Session
):
    ticket = session.exec(select(Ticket).where(Ticket.id == ticket_id)).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    
    return ticket


