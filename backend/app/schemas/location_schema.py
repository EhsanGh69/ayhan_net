from pydantic import BaseModel


class ProvinceSchema(BaseModel):
    name: str


class CitySchema(BaseModel):
    name: str
    province_id: int


class AreaSchema(BaseModel):
    name: str
    city_id: int


class CityView(BaseModel):
    id: int
    name: str

    model_config = { "from_attributes": True }


class AreaView(BaseModel):
    id: int
    name: str

    model_config = { "from_attributes": True }


