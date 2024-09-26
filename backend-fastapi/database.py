from model import Todo

# mongoDB driver
import motor.motor_asyncio

# Connect to MongoDB from database.py

# client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')
client = motor.motor_asyncio.AsyncIOMotorClient('mongodb+srv://samarthpawan:wZ0muoGyBLLNgGWS@cluster0.hnueddz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')


database = client.TodoList
collection = database.todo

async def fetch_one_todo(title):
    document = await collection.find_one({"title": title})
    return document

async def fetch_all_todos():
    todos = []
    cursor = collection.find({})
    async for document in cursor:
        todos.append(Todo(**document))
    return todos

async def create_todo(todo):
    document = todo
    result = await collection.insert_one(document)
    return document

async def update_todo(title, description):
    await collection.update_one({"title": title}, {"$set": {"description": description}})
    document = await collection.find_one

async def remove_todo(title):
    await collection.delete_one({"title": title})
    return True




