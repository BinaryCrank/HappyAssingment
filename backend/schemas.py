from pydantic import BaseModel
from typing import List, Optional
import datetime

class NoteBase(BaseModel):
    note_text: str

class NoteCreate(NoteBase):
    pass

class Note(NoteBase):
    id: int
    ticket_id: int
    created_at: datetime.datetime

    class Config:
        from_attributes = True

class TicketBase(BaseModel):
    customer_name: str
    customer_email: str
    subject: str
    description: str

class TicketCreate(TicketBase):
    pass

class TicketUpdate(BaseModel):
    status: Optional[str] = None
    note: Optional[str] = None

class Ticket(TicketBase):
    id: int
    ticket_id: str
    status: str
    created_at: datetime.datetime
    updated_at: datetime.datetime
    notes: List[Note] = []

    class Config:
        from_attributes = True
        
class TicketListResponse(BaseModel):
    id: int
    ticket_id: str
    customer_name: str
    customer_email: str
    subject: str
    status: str
    created_at: datetime.datetime
    
    class Config:
        from_attributes = True
