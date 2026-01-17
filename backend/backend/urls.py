from django.urls import path, include

from django.contrib import admin

urlpatterns = [
        path("admin/", admin.site.urls),   # ✅ ADD THIS LINE

    path("api/owners/", include("owners.urls")),
    path("api/members/", include("members.urls")),
    path("api/subscriptions/", include("subscriptions.urls")),
    path("api/analytics/", include("analytics.urls")),
]
