from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine
from routers import tickets

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="CRM Ticketing System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tickets.router)

@app.get("/")
def read_root():
    return {"message": "CRM API is running"}
