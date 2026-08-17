from django.contrib import admin
from .models import Event


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):

    list_display = [
        "id",
        "title",
        "owner",
        "target_date",
        "created_at",
    ]

    list_filter = [
        "target_date",
        "created_at",
    ]

    search_fields = [
        "title",
        "owner__username",
    ]