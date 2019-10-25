from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class MyAccountManager(BaseUserManager):
    def create_user(self, email, username, password=None,**args):
        if not email:
            raise ValueError("Users must have an email address")
        if not username:
            raise ValueError("Users must have a username")
        
        user = self.model(
            email=self.normalize_email(email),
            username=username
        )

        user.set_password(password)

        # check for null value
        if args:
            if args['given_name'] is not None:
                user.given_name = args['given_name']
            
            if args['family_name'] is not None:
                user.family_name = args['family_name']

            user.save(using=self._db)
            if args['is_social_account']:
                # Create social account
                social_account = SocialAccount.objects.create(
                    account=user,
                    social_name = username,
                    user_id = args['user_id'], 
                    access_token = args['social_token'],
                    provider = args['provider'],
                    image_url = args['image_url']
                    )
                social_account.save(using=self._db)

        return user

    def create_superuser(self,email,username,password):
        user = self.create_user(
            email = self.normalize_email(email),
            password = password,
            username = username,
        )
        user.is_admin= True
        user.is_staff= True
        user.is_superuser= True
        user.save(using=self._db)
        return user



class Account(AbstractBaseUser):
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    username = models.CharField(max_length=50, unique=True)
    given_name = models.CharField(max_length=50, null=True)
    family_name = models.CharField(max_length=50, null=True)    
    date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


    objects = MyAccountManager()

    def __str__(self):
        return self.email
    
    def has_perm(self, perm, obj=None):
        return self.is_admin
    
    def has_module_perms(self, app_label):
        return True

    
class SocialAccount(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    social_name = models.CharField(max_length=50, null=True)
    user_id = models.CharField(max_length=200, null=True)
    access_token = models.CharField(max_length=800, null=True)
    provider = models.CharField(max_length=30, null=True)
    image_url = models.CharField(max_length=300, null=True)

    def __str__(self):
        return self.user_id

