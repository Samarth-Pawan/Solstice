from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel

from database import (
    fetch_investor, fetch_all_investors, create_investor, update_investor, delete_investor,
    fetch_startup, fetch_all_startups, create_startup, update_startup, delete_startup
)
from model import Investor, Startup
from chat import app as chat_app

app = FastAPI()

app.mount("/chat", chat_app)  # Mount the chat API

origins = ["http://localhost:3000"]  # Adjust based on your frontend

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    message: str

# @app.post("/api/chat/")
# async def chat_endpoint(chat_message):
#     print(chat_message)
#     try:
#         return {"response": "Yes, I am listening"}
#         # response = chat_model(chat_message.message, max_length=100)[0]['generated_text']
#         # return {"response": response}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/chat/")
async def chat_endpoint(chat_message: ChatMessage):
    print(chat_message.message)  # Access the 'message' field from the ChatMessage object
    try:
        return {"response": "Yes, I am listening"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/")
def read_root():
    return {"Hello": "Solstice Platform"}

@app.get("/api/investors", response_model=List[Investor])
async def get_investors(name: str = None):
    if name:
        response = await fetch_investor(name)
        return [response] if response else []
    response = await fetch_all_investors()
    return response

@app.get("/api/startups", response_model=List[Startup])
async def get_startups(company_name: str = None):
    if company_name:
        response = await fetch_startup(company_name)
        return [response] if response else []
    response = await fetch_all_startups()
    return response

@app.get("/api/investor/{name}", response_model=Investor)
async def get_investor_by_name(name: str):
    response = await fetch_investor(name)
    if response:
        return response
    raise HTTPException(404, f"No investor found with name {name}")

@app.post("/api/investor", response_model=Investor)
async def post_investor(investor: Investor):
    response = await create_investor(investor)
    if response:
        return response
    raise HTTPException(400, "Error creating investor")

@app.put("/api/investor/{name}", response_model=Investor)
async def put_investor(name: str, investor: Investor):
    response = await update_investor(name, investor.dict())
    if response:
        return response
    raise HTTPException(404, f"No investor found with name {name}")

@app.delete("/api/investor/{name}")
async def delete_investor(name: str):
    response = await delete_investor(name)
    if response:
        return {"message": "Investor deleted successfully"}
    raise HTTPException(404, f"No investor found with name {name}")

# Startup CRUD Operations
# @app.get("/api/startups", response_model=List[Startup])
# async def get_startups():
#     response = await fetch_all_startups()
#     return response

@app.get("/api/startup/{company_name}", response_model=Startup)
async def get_startup_by_company_name(company_name: str):
    response = await fetch_startup(company_name)
    if response:
        return response
    raise HTTPException(404, f"No startup found with company name {company_name}")

@app.post("/api/startup", response_model=Startup)
async def post_startup(startup: Startup):
    response = await create_startup(startup)
    if response:
        return response
    raise HTTPException(400, "Error creating startup")

@app.put("/api/startup/{company_name}", response_model=Startup)
async def put_startup(company_name: str, startup: Startup):
    response = await update_startup(company_name, startup.dict())
    if response:
        return response
    raise HTTPException(404, f"No startup found with company name {company_name}")

@app.delete("/api/startup/{company_name}")
async def delete_startup(company_name: str):
    response = await delete_startup(company_name)
    if response:
        return {"message": "Startup deleted successfully"}
    raise HTTPException(404, f"No startup found with company name {company_name}")
