from django.urls import path

from .views import CurrentUserView, ChangePassword

urlpatterns = [
    path('me/', CurrentUserView.as_view(), name='current_user'),
    path('change-password/', ChangePassword.as_view(), name='change_password'),
]
