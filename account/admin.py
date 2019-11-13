from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group

from .models import (Account, Address, Business, City, Country, Holiday,
                     Provider, Region, SocialAccount, Vacation, WorkingHours)

# Registering/Unregistering models
admin.site.register([SocialAccount, Holiday, Region,
                     City, Address, Business, Provider, Vacation, WorkingHours])
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
