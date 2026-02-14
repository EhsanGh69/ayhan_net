import hashlib
import time
from django.core.cache import cache
from django.contrib.auth.models import User
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import TokenError


from .serializers import UserDetailsSerializer, EmptySerializer

class CurrentUserView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserDetailsSerializer

    def get_object(self):
        return self.request.user
    

class ChangePassword(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EmptySerializer

    def post(self, request: Request):
        user: User = request.user
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        if not old_password or not new_password:
            return Response({
                'success': False,
                'error': 'رمز عبور فعلی و جدید الزامی است'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if not user.check_password(old_password):
            return Response({
                'success': False,
                'error': 'رمز عبور فعلی اشتباه است'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        user.set_password(new_password)
        user.save()

        return Response({
            'success': True,
            'message': 'رمز عبور با موفقیت تغییر کرد'
        }, status=status.HTTP_400_BAD_REQUEST)
    

class LogoutView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EmptySerializer

    def post(self, request: Request):
        try:
            refresh_token = request.data.get('refresh')
            if refresh_token:
                try:
                    token = RefreshToken(refresh_token)
                    token.blacklist()
                except TokenError:
                    pass

            auth_header = request.headers.get('Authorization')
            if auth_header and auth_header.startswith('Bearer '):
                access_token = auth_header.split(' ')[1]
                hashed_token = hashlib.sha256(access_token.encode()).hexdigest()
                cache_key = f'blacklisted_token_{hashed_token}'
                
                try:
                    token = AccessToken(access_token)
                    expiry = token.payload.get('exp')
                    if expiry:
                        ttl = expiry - int(time.time())
                        if ttl > 0:
                            cache.set(cache_key, True, timeout=ttl)
                    else:
                        cache.set(cache_key, True, timeout=60*60)
                except TokenError:
                    cache.set(cache_key, True, timeout=60*5)

            return Response({'message': 'با موفقیت خارج شدید'}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
