from pydantic import BaseModel, Field

class AddTicketGroup(BaseModel):
    title: str = Field(min_length=3, max_length=50, pattern=r"^[1-9\u0600-\u06FF\s]+$")


class TicketGroup(BaseModel):
    id: int
    title: str

    model_config = { "from_attributes": True }


class TicketBaseSchema(BaseModel):
    name: str = Field(min_length=3, max_length=50, pattern=r"^[1-9\u0600-\u06FF\s]+$")
    description: str = Field(min_length=1, max_length=200, pattern=r"^[\w\u0600-\u06FF\s\-,.]+$")


class TicketCreateSchema(TicketBaseSchema):
    group_id: int


class TicketUpdateSchema(TicketBaseSchema):
    group_id: int


class TicketViewSchema(TicketBaseSchema):
    id: int
    group: TicketGroup

    model_config = { "from_attributes": True }

