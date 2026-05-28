from pydantic import BaseModel
from typing import Optional

class BaseConf(BaseModel):
    class Config :
        env_file:str =".env"

class GlobslConf(BaseConf):
    BATABASE_URL : Optional[str]=None
    DB_FORCE_ROLL_BACK: bool = False