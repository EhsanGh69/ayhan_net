from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.routing import APIRoute

from app.routers.admin_router import router as admin_router
from app.routers.auth_router import router as auth_router
from app.routers.staff_router import router as staff_router
from app.routers.provinces_router import router as provinces_router
from app.routers.subscriber_router import router as subscriber_router
from app.routers.ticket_router import router as ticket_router
from app.routers.ticket_record_router import router as ticket_record_router


app = FastAPI(title="Ayhan Net")

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
app.include_router(ticket_router)
app.include_router(ticket_record_router)

app.mount("/media", StaticFiles(directory="app/media"), name="media")
app.mount("/statics", StaticFiles(directory="app/statics"), name="statics")
templates = Jinja2Templates(directory="app/templates")

@app.get("/docs-list")
def show_docs(request: Request):
    routes_info = []
    for route in app.routes:
        if not isinstance(route, APIRoute):
            continue

        methods = [m for m in route.methods if m not in ("HEAD", "OPTIONS")]
        for method in methods:
            routes_info.append({
                "path": route.path,
                "method": method,
            })
    
    return templates.TemplateResponse(
        "routes.html",
        {"request": request, "routes": routes_info, "app_name": app.title}
    )