import json
from pathlib import Path

from app.schemas.provinces_schema import Province, City


PROVINCES_PATH = Path(__file__).resolve().parent.parent / "data" / "provinces.json"
CITIES_PATH = Path(__file__).resolve().parent.parent / "data" / "cities.json"

with open(PROVINCES_PATH, "r", encoding="utf-8") as f:
    PROVINCES = json.load(f)
    
with open(CITIES_PATH, "r", encoding="utf-8") as f:
    CITIES = json.load(f)
    
PROVINCE_CITY_IDS = {
    province["province_id"]: {city["id"] for city in province["cities"]}
    for province in CITIES
}

PROVINCE_MAP = {p["id"]: Province(**p) for p in PROVINCES}
CITY_MAP = {c["id"]: City(**c) for prov in CITIES for c in prov["cities"]}