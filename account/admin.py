from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group

from .models import (Account, Address, Business, City, Country, Holiday,
                     Provider, Region, SocialAccount, Vacation, WorkingHours)

# Registering/Unregistering models
admin.site.register([Address, Business, Provider, ])
admin.site.unregister(Group)

# Customizing admin dasboard main attributes
admin.site.site_header = "Dashboard Admin"
admin.site.site_title = "Dashboard Admin Area"
admin.site.index_title = "Welcome to the Dashboard admin area"


# Customizing models representation
class SocialInline(admin.TabularInline):
    model = SocialAccount
    extra = 3


@admin.register(Account)
class AccountAdmin(UserAdmin):
    list_display = ('email', 'username', 'given_name', 'family_name',
                    'date_joined', 'last_login', 'is_admin', 'is_staff')
    search_fields = ('email', 'username')
    readonly_fields = ('date_joined', 'last_login')
    inlines = [SocialInline]
    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

# SOCIAL ACCOUNT MODEL #### (HIDDEN)
@admin.register(SocialAccount)
class SocialAccountAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}

# HOLIDAY MODEL #### (HIDDEN)
@admin.register(Holiday)
class HolidayAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}

# VACATION MODEL #### (HIDDEN)
@admin.register(Vacation)
class VacationAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}

# WORKING HOURS MODEL #### (HIDDEN)
@admin.register(WorkingHours)
class WorkingHoursAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}


#### COUNTRY MODEL ####
class CountryInline(admin.StackedInline):
    model = Country.holidays.through
    extra = 0
    verbose_name = "Holiday"
    verbose_name_plural = "Holidays"
    fields = ["holiday", ]

    def has_change_permission(self, request, obj=None, **kwargs):
        return False

    # def has_add_permission(self, request, obj=None, **kwargs):
    # return False


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    inlines = [CountryInline]
    exclude = ('holidays',)


#### REGION MODEL ####
class RegionInline(admin.StackedInline):
    model = Region.holidays.through
    extra = 0
    verbose_name = "Holiday"
    verbose_name_plural = "Holidays"
    fields = ["holiday", ]

    def has_change_permission(self, request, obj=None, **kwargs):
        return False

    # def has_add_permission(self, request, obj=None, **kwargs):
    # return False


@admin.register(Region)
class RegionAdmin(admin.ModelAdmin):
    inlines = [RegionInline]
    exclude = ('holidays',)


#### CITY MODEL ####
class CityInline(admin.StackedInline):
    model = City.holidays.through
    extra = 0
    verbose_name = "Holiday"
    verbose_name_plural = "Holidays"
    fields = ["holiday", ]

    def has_change_permission(self, request, obj=None, **kwargs):
        return False

    # def has_add_permission(self, request, obj=None, **kwargs):
    # return False


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    inlines = [CityInline]
    exclude = ('holidays',)
