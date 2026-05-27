from rest_framework.viewsets import ModelViewSet
from .models import Member
from .serializers import MemberSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .utils import expire_members
from django.utils.timezone import now
from rest_framework.permissions import IsAuthenticated
from dateutil.relativedelta import relativedelta

class MemberViewSet(ModelViewSet):
    serializer_class = MemberSerializer

    def get_queryset(self):
        return Member.objects.filter(owner=self.request.user)

    def create(self, request, *args, **kwargs):
        print("CREATE HIT ✅")
        print(request.data)
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ExpireMembersView(APIView):
    def post(self, request):
        count = expire_members()
        return Response({
            "expired_members": count
        })
class MarkMemberPaidView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id):
        try:
            member = Member.objects.get(id=id, owner=request.user)

            months = int(member.membership_type)

            # renew from today
            member.start_date = now().date()

            # calculate new due date
            member.expiry_date = (
                member.start_date +
                relativedelta(months=months)
            )

            member.is_active = True

            member.save()

            return Response({
                "message": "Membership renewed successfully"
            })

        except Member.DoesNotExist:
            return Response({
                "error": "Member not found"
            }, status=404)