import uuid
import os
from fastapi import UploadFile, HTTPException

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "webp"}
MAX_FILE_SIZE = 200 * 1024  # 200KB

def image_validation(file: UploadFile):
    ext = file.filename.split(".")[-1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"فرمت تصویر آپلود شده غیرمجاز است"
        )
    
    file.file.seek(0, 2) # go to end of file
    size = file.file.tell()
    file.file.seek(0) # go to start of file
    if size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail=f"سایز تصویر آپلود شده بیش از حد مجاز است"
        )
        


def save_file(file: UploadFile, file_dir: str):
    os.makedirs(file_dir, exist_ok=True)
    ext = file.filename.split(".")[-1]
    unique_name = f"{uuid.uuid4()}.{ext}"
    file_path = os.path.join(file_dir, unique_name)
    with open(file_path, "wb") as f:
        f.write(file.file.read())
        
    return unique_name


def delete_file(filename: str, file_dir: str):
    if not filename:
        return
    file_path = os.path.join(file_dir, filename)
    if os.path.exists(file_path):
        os.remove(file_path)
