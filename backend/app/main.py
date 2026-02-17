from fastapi import FastAPI

from app.routers.admin_router import router as admin_router
from app.routers.auth_router import router as auth_router


app = FastAPI()

app.include_router(admin_router)
app.include_router(auth_router)