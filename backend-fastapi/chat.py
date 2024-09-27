from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
# from transformers import pipeline

app = FastAPI()

# Load the fine-tuned ChatGPT model
# chat_model = pipeline("text-generation", model="path/to/your/fine-tuned-model")

class ChatMessage(BaseModel):
    message: str

# @app.post("/api/chat/")
# async def chat_endpoint(chat_message: ChatMessage):
#     print(chat_message)
#     try:
#         return {"reponse": "Yes, I am listening"}
#         response = chat_model(chat_message.message, max_length=100)[0]['generated_text']
#         return {"response": response}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
