from django.urls import path
from .views import SendExpiredMembersWhatsApp

urlpatterns = [
    path("send-reminders/", SendExpiredMembersWhatsApp.as_view()),
]
