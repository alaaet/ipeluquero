from django.contrib.auth import authenticate
from account.models import Account
from rest_framework import serializers

#Account._meta.get_field('email')._unique = True

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id','username','email')

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = Account.objects.create_user(
            validated_data['email'],
            validated_data['username'],            
            validated_data['password']
        )
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self,data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect credentials!")