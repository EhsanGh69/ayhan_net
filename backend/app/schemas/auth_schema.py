from pydantic import BaseModel

class AdminCreateSchema(BaseModel):
    username: str
    password: str
    first_name: str | None = None
    last_name: str | None = None
    secret: str

class LoginSchema(BaseModel):
    username: str
    password: str

class TokenSchema(BaseModel):
    access_token: str
    token_type: str = "bearer"

class CurrentUserSchema(BaseModel):
    username: str
    first_name: str | None
    last_name: str | None
    is_admin: bool
    is_staff: bool
    is_active: bool

    model_config = { "from_attributes": True }
