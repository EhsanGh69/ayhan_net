import re
from pydantic import BaseModel, Field, field_validator, ConfigDict

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
    
class UserBaseSchema(BaseModel):
    first_name: str = Field(min_length=3, max_length=50, pattern=r"^[\u0600-\u06FF\s]+$")
    last_name: str = Field(min_length=3, max_length=50, pattern=r"^[\u0600-\u06FF\s]+$")
    username: str = Field(min_length=3, max_length=50)
    
    @field_validator("username")
    def validate_username(cls, v):
        if not re.fullmatch(r"[A-Za-z0-9_.@-]+", v):
            raise ValueError("Invalid characters in username")
        if not re.search(r"[A-Za-z]", v): 
            raise ValueError("Username must contain at least one letter")
        if not re.search(r"[0-9]", v):
            raise ValueError("Username must contain at least one digit")
        return v


class PasswordSchema(BaseModel):
    password: str = Field(min_length=8, max_length=20)
    
    @field_validator("password")
    def validate_password(cls, v):
        if not re.fullmatch(r"[A-Za-z0-9_.@-]+", v): 
            raise ValueError("Invalid characters in password")
        if not re.search(r"[A-Za-z]", v): 
            raise ValueError("Password must contain at least one letter")
        if not re.search(r"[0-9]", v):
            raise ValueError("Password must contain at least one digit")
        if not re.search(r"[_.@-]", v):
            raise ValueError("Password must contain at least one of chars: /_-@./")
        return v

class UserCreateSchema(UserBaseSchema, PasswordSchema):
    model_config = ConfigDict(extra="forbid")
    pass

class ChangePasswordSchema(BaseModel):
    old_password: str
    new_password: str = Field(min_length=8, max_length=20)
    
    @field_validator("new_password")
    def validate_new_password(cls, v):
        return PasswordSchema.validate_password(v)

class UserDetailSchema(UserBaseSchema):
    id: int
    is_active: bool
    
    model_config = { "from_attributes": True }

