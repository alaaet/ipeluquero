from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

######### HOLIDAYS & VACATIONS RELATED MODELS #########


class Holiday(models.Model):
    name = models.CharField(max_length=30)
    date_from = models.DateField()
    date_to = models.DateField()
    is_confirmed = models.BooleanField(default=False)
    is_international = models.BooleanField(default=False)
    is_annual = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Holiday'
        verbose_name_plural = "Holidays"

    def __str__(self):
        return self.name + "  ("+str(self.date_from)+" to "+str(self.date_to)+")"

######### ADDRESS RELATED MODELS #########


class Country(models.Model):
    name = models.CharField(max_length=30)
    abbreviation = models.CharField(max_length=10)
    call_code = models.CharField(max_length=50)
    flag_url = models.CharField(max_length=60, null=True, blank=True)
    holidays = models.ManyToManyField(Holiday, blank=True)

    class Meta:
        verbose_name = 'Country'
        verbose_name_plural = "Countries"

    def __str__(self):
        return self.name


class Region(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    abbreviation = models.CharField(max_length=10, null=True)
    holidays = models.ManyToManyField(Holiday, blank=True)

    class Meta:
        verbose_name = 'Region'

    def __str__(self):
        return self.name


class City(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    region = models.ForeignKey(Region, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    holidays = models.ManyToManyField(Holiday, blank=True)

    class Meta:
        verbose_name = 'City'
        verbose_name_plural = "Cities"

    def __str__(self):
        return self.name


class Address(models.Model):
    name = models.CharField(max_length=30)
    st_line1 = models.CharField(max_length=50)
    st_line2 = models.CharField(max_length=50, null=True, blank=True)
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True)
    region = models.ForeignKey(Region, on_delete=models.SET_NULL, null=True)
    postal_code = models.CharField(max_length=5, default="28013")
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, null=True)

    class Meta:
        verbose_name = 'Address'
        verbose_name_plural = "Addresses"

    def __str__(self):
        return self.name


######### ACCOUNTS & SOCIAL ACCOUNTS HOURS RELATED MODELS #########


class MyAccountManager(BaseUserManager):
    def create_user(self, email, username, password=None, **args):
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
                    social_name=username,
                    user_id=args['user_id'],
                    access_token=args['social_token'],
                    provider=args['provider'],
                    image_url=args['image_url']
                )
                social_account.save(using=self._db)

        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            username=username,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class Account(AbstractBaseUser):
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    username = models.CharField(max_length=50, unique=True)
    given_name = models.CharField(max_length=50, null=True)
    family_name = models.CharField(max_length=50, null=True)
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True)
    date_joined = models.DateTimeField(
        verbose_name='date joined', auto_now_add=True)
    #last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
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


######### BUSINESS & WORKING HOURS RELATED MODELS #########
class Business(models.Model):
    name = models.CharField(max_length=30)
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True)
    admin = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True)

    class Meta:
        verbose_name = 'Business'
        verbose_name_plural = "Businesses"

    def __str__(self):
        return self.name


######### PROVIDERS RELATED MODELS #########
class Provider(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    business = models.ForeignKey(
        Business, on_delete=models.SET_NULL, null=True)
    is_business_admin = models.BooleanField(default=False)
    rating_avg = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.account.username


class Vacation(models.Model):
    motive = models.CharField(max_length=30, blank=True)
    date_from = models.DateField(null=False, blank=False)
    date_to = models.DateField(null=False, blank=False)
    is_confirmed = models.BooleanField(default=False)
    employee = models.ForeignKey(Provider, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Vacation'

    def __str__(self):
        return self.motive


######### EMPLOYEES WORKING HOURS AND VACATIONS RELATED MODELS #########
class WorkingHours(models.Model):
    employee = models.ForeignKey(Provider, on_delete=models.CASCADE)
    day_order = models.IntegerField(default=1)
    # period_order is the working period, ex: morning shift
    period_order = models.IntegerField(default=1)
    time_from = models.TimeField(null=False, blank=False)
    time_to = models.TimeField(null=False, blank=False)

    class Meta:
        verbose_name = 'WorkingHours'
        verbose_name_plural = "WorkingHours"

    def __str__(self):
        return self.employee.account.username
