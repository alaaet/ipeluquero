from django.contrib.auth import authenticate
from account.models import Account
from rest_framework import serializers

#Account._meta.get_field('email')._unique = True

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id','username','email','provider','given_name','family_name','image_url','social_token','is_social_account')

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
        print("Validating if the user ", data['username']," exists")
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect credentials!")

class SocialLoginSerializer(serializers.Serializer):
    class Meta:
        model = Account
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}
    
    username = serializers.CharField()
    password = serializers.CharField()
    email = serializers.CharField()
    provider = serializers.CharField()
    given_name = serializers.CharField()
    family_name = serializers.CharField()
    image_url = serializers.CharField()
    social_token = serializers.CharField()
    is_social_account = serializers.BooleanField()
    
    def validate(self,data):
        print("Validating if the user ", data['username']," exists")
        prepared_data = {'username':data['email'],'password':data['password']}
        user = authenticate(**prepared_data)
        print("Validation result", user)
        if user and user.is_active:
            return {
            "user": user,
            "exists": True
            }
        return {
            "user": data,
            "exists": False
            }

    def create(self, validated_data):
        user_data = validated_data['user']
        print("Creating a new user", user_data)
        extra_args = {
            'provider':user_data['provider'],
            'given_name':user_data['given_name'] ,
            'family_name':user_data['family_name'],
            'image_url':user_data['image_url'],
            'social_token':user_data['social_token'],
            'is_social_account':user_data['is_social_account']
        }
        user = Account.objects.create_user(user_data['email'],user_data['username'],user_data['password'], **extra_args)
        return user