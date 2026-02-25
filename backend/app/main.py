from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routers.admin_router import router as admin_router
from app.routers.auth_router import router as auth_router
from app.routers.staff_router import router as staff_router
from app.routers.provinces_router import router as provinces_router
from app.routers.subscriber_router import router as subscriber_router


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173",],
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"],
)

app.include_router(admin_router)
app.include_router(auth_router)
app.include_router(staff_router)
app.include_router(provinces_router)
app.include_router(subscriber_router)

app.mount("/media", StaticFiles(directory="app/media"), name="media")