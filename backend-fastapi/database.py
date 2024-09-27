# mongodb+srv://samarthpawan:wZ0muoGyBLLNgGWS@cluster0.hnueddz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

from model import Investor, Startup
import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb+srv://samarthpawan:wZ0muoGyBLLNgGWS@cluster0.hnueddz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

database = client.Solstice
investor_collection = database.investors
startup_collection = database.startups

# Investor CRUD operations
async def create_investor(investor):
    document = investor.dict()
    await investor_collection.insert_one(document)
    return document

async def fetch_investor(name):
    document = await investor_collection.find_one({"name": name})
    return document

async def fetch_all_investors():
    investors = []
    cursor = investor_collection.find({})
    async for document in cursor:
        investors.append(Investor(**document))
    return investors

async def update_investor(name, investor_data):
    await investor_collection.update_one({"name": name}, {"$set": investor_data})
    document = await investor_collection.find_one({"name": name})
    return document

async def delete_investor(name):
    await investor_collection.delete_one({"name": name})
    return True

# Startup CRUD operations
async def create_startup(startup):
    document = startup.dict()
    await startup_collection.insert_one(document)
    return document

async def fetch_startup(company_name):
    document = await startup_collection.find_one({"company_name": company_name})
    return document

async def fetch_all_startups():
    startups = []
    cursor = startup_collection.find({})
    async for document in cursor:
        startups.append(Startup(**document))
    return startups

async def update_startup(company_name, startup_data):
    await startup_collection.update_one({"company_name": company_name}, {"$set": startup_data})
    document = await startup_collection.find_one({"company_name": company_name})
    return document

async def delete_startup(company_name):
    await startup_collection.delete_one({"company_name": company_name})
    return True
