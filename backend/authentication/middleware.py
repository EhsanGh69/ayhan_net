import hashlib
import logging
from django.core.cache import cache
from django.http import JsonResponse

logger = logging.getLogger(__name__)

class BlackListTokenMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path == '/api/logout/':
            response = self.handle_logout_request(request)
            if response:
                return response
        
        response = self.get_response(request)
        return response
        
    def handle_logout_request(self, request):
        if request.method == 'OPTIONS':
            return None
        
        auth_header = request.headers.get('Authorization', '')
        if not auth_header:
            return None
        
        if not auth_header.startswith('Bearer '):
            logger.warning("Invalid auth header for logout")
            return JsonResponse(
                {
                    'success': False,
                    'error': {
                        'code': 'invalid_token_format',
                        'message': 'فرمت توکن اشتباه است',
                        'detail': 'از Bearer token استفاده کنید'
                    }
                },
                status=401
            )
        
        access_token = auth_header.split(' ')[1]
        if self.is_token_blacklisted(access_token):
            logger.info("Logout attempt with blacklisted token")
            return JsonResponse(
                {
                    'success': False,
                    'error': {
                        'code': 'token_blacklisted',
                        'message': 'توکن قبلاً بلاک‌لیست شده است',
                        'detail': 'شما قبلاً خارج شده‌اید'
                    }
                },
                status=401
            )
        
        return None
    
    def is_token_blacklisted(self, token):
        try:
            if not token or len(token) < 10:
                return False
            
            hashed_token = hashlib.sha256(token.encode()).hexdigest()
            cache_key = f'blacklisted_token_{hashed_token}'
            
            return cache.get(cache_key, False)
            
        except Exception as e:
            logger.error(f"Error checking blacklist: {str(e)}")
            return False