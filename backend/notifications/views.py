from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .services import send_expired_members_reminders
import logging
logger = logging.getLogger(__name__)
class SendExpiredMembersWhatsApp(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        count = send_expired_members_reminders(request.user)
        logger.error("REMINDER ENDPOINT HIT")
        return Response({
            "message": "WhatsApp reminders sent",
            "members_notified": count
        })
