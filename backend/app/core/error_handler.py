import traceback
import logging
from functools import wraps
from fastapi.exceptions import HTTPException


logging.basicConfig(
    level=logging.ERROR,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("errors.log", encoding="utf-8"),
        logging.StreamHandler() # show log in terminal
    ]
)


logger = logging.getLogger(__name__)


def handle_errors(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Function: {func.__name__}")
            logger.error(f"Args: {args}")
            logger.error(f"Kwargs: {kwargs}")
            logger.error(f"Error: {e}")
            logger.error(traceback.format_exc())
            raise HTTPException(status_code=500, detail="خطای داخلی سرور")
        
    return wrapper
