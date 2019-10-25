from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Account, SocialAccount

admin.site.site_header = "Dashboard Admin"
admin.site.site_title = "Dashboard Admin Area"
admin.site.index_title = "Welcome to the Dashboard admin area"

class SocialInline(admin.TabularInline):
    model = SocialAccount
    extra = 3

class AccountAdmin(UserAdmin):
    list_display = ('email','username','given_name','family_name','date_joined','last_login','is_admin','is_staff')
    search_fields = ('email','username')
    readonly_fields=('date_joined','last_login')
    inlines = [SocialInline]
    filter_horizontal=()
    list_filter=()
    fieldsets=()

admin.site.register(Account,AccountAdmin)
admin.site.register(SocialAccount)


