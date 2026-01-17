from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .services import send_expired_members_reminders

class SendExpiredMembersWhatsApp(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        count = send_expired_members_reminders(request.user)
        return Response({
            "message": "WhatsApp reminders sent",
            "members_notified": count
        })
