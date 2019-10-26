from django.contrib.auth import authenticate
from account.models import Account, SocialAccount
from rest_framework import serializers
from account.social_verifier import SocialVerifier

#Account._meta.get_field('email')._unique = True


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'username', 'email')


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

    def validate(self, data):
        print("Validating if the user ", data['username'], " exists")
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
    email = serializers.CharField()
    given_name = serializers.CharField()
    family_name = serializers.CharField()
    user_id = serializers.CharField()
    social_token = serializers.CharField()
    provider = serializers.CharField()
    image_url = serializers.CharField()

    def validate(self, data):
        is_real_account = SocialVerifier.checkToken(
            data['provider'], data['social_token'], data['user_id'])
        print("IS REAL ACCOUNT: ", is_real_account)
        if is_real_account:
            try:
                social_account = SocialAccount.objects.all().get(
                    user_id=data['user_id'], provider=data['provider'])
                email = social_account.account
                user = Account.objects.all().get(email=email)
            except SocialAccount.DoesNotExist:
                try:
                    user = Account.objects.all().get(email=data['email'])
                    social_account = SocialAccount.objects.create(
                        account=user,
                        social_name=data['username'],
                        user_id=data['user_id'],
                        access_token=data['social_token'],
                        provider=data['provider'],
                        image_url=data['image_url']
                    )
                    print("SOCIAL USER: ", social_account)
                    print("USER: ", user)
                    print("is_active: ", user.is_active)
                    social_account.save()
                except Account.DoesNotExist:
                    return {"user": data, "exists": False}

            if user and user.is_active:
                print("USER EXISTS")
                return {
                    "user": user,
                    "exists": True
                }
            return {
                "user": data,
                "exists": False
            }
        return {"exists": False}

    def create(self, validated_data):
        user_data = validated_data['user']
        is_real_account = SocialVerifier.checkToken(
            user_data['provider'], user_data['social_token'], user_data['user_id'])
        if is_real_account:
            print("Creating a new user", user_data)
            extra_args = {
                'given_name': user_data['given_name'],
                'family_name': user_data['family_name'],
                'user_id': user_data['user_id'],
                'social_token': user_data['social_token'],
                'provider': user_data['provider'],
                'image_url': user_data['image_url'],
                'is_social_account': True
            }
            user = Account.objects.create_user(
                user_data['email'], user_data['username'], Account.objects.make_random_password(), **extra_args)
            return user
        raise Exception('The token is not valid!')
