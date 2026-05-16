from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_
import models, schemas
from database import get_db

router = APIRouter(
    prefix="/api/tickets",
    tags=["tickets"]
)

@router.post("/", response_model=schemas.Ticket)
def create_ticket(ticket: schemas.TicketCreate, db: Session = Depends(get_db)):
    db_ticket = models.Ticket(**ticket.model_dump())
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    
    # Generate TKT-001 format
    db_ticket.ticket_id = f"TKT-{db_ticket.id:03d}"
    db.commit()
    db.refresh(db_ticket)
    
    return db_ticket

@router.get("/", response_model=list[schemas.TicketListResponse])
def read_tickets(skip: int = 0, limit: int = 100, status: str = None, search: str = None, db: Session = Depends(get_db)):
    query = db.query(models.Ticket)
    
    if status and status != "All":
        query = query.filter(models.Ticket.status == status)
        
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            or_(
                models.Ticket.customer_name.ilike(search_term),
                models.Ticket.customer_email.ilike(search_term),
                models.Ticket.ticket_id.ilike(search_term),
                models.Ticket.subject.ilike(search_term),
                models.Ticket.description.ilike(search_term)
            )
        )
        
    tickets = query.order_by(models.Ticket.created_at.desc()).offset(skip).limit(limit).all()
    return tickets

@router.get("/{ticket_id}", response_model=schemas.Ticket)
def read_ticket(ticket_id: str, db: Session = Depends(get_db)):
    ticket = db.query(models.Ticket).filter(models.Ticket.ticket_id == ticket_id).first()
    if ticket is None:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket

@router.put("/{ticket_id}", response_model=schemas.Ticket)
def update_ticket(ticket_id: str, ticket_update: schemas.TicketUpdate, db: Session = Depends(get_db)):
    ticket = db.query(models.Ticket).filter(models.Ticket.ticket_id == ticket_id).first()
    if ticket is None:
        raise HTTPException(status_code=404, detail="Ticket not found")
        
    if ticket_update.status:
        ticket.status = ticket_update.status
        
    if ticket_update.note:
        new_note = models.Note(note_text=ticket_update.note, ticket_id=ticket.id)
        db.add(new_note)
        
    db.commit()
    db.refresh(ticket)
    return ticket
