from pydantic import BaseModel
from typing import List

class Investor(BaseModel):
    name: str
    preferences: str
    history: List[str]


class Startup(BaseModel):
    company_name: str
    description: str
    industry: str
    # location: str
    # pitch_deck_url: str
