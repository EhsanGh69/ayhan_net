from django.contrib.auth.models import User
from rest_framework import serializers

class UserDetailsSerializer(serializers.ModelSerializer):
    fullname = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'fullname', 'is_superuser', 'is_staff']
        read_only_fields = ['id']
    
    def get_fullname(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip() or obj.username
    
class EmptySerializer(serializers.Serializer):
    """Empty Serializer For Swagger Docs"""
    pass