from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

from database import fetch_one_todo, fetch_all_todos, create_todo, update_todo, remove_todo
from model import Todo

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

# crud operations

@app.get("/api/todo")
async def get_todo():
    response = await fetch_all_todos()
    return response
    # return {"data": "get todo"}

@app.get("/api/todo/{title}", response_model=Todo)
async def get_todo_by_id(title: int):
    response = await fetch_one_todo(title)
    if response:
        return response
    raise HTTPException(404, f"There is no todo item with the title {title}")

@app.post("/api/todo", response_model=Todo)
async def post_todo(todo: Todo):
    response = await create_todo(todo.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong / Bad Request")


@app.put("/api/todo/{title}", response_model=Todo)
async def put_todo(title: int, description: str):
    response = await update_todo(title, description)
    if response:
        return response
    raise HTTPException(404, f"There is no todo item with the title {title}")


@app.delete("/api/todo/{title}")
async def delete_todo(title: int):
    response = await remove_todo(title)
    if response:
        return "Successfully deleted todo item"
    raise HTTPException(404, f"There is no todo item with the title {title}")
