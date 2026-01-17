from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils.timezone import now
from members.models import Member

MEMBERSHIP_PRICES = {
    "1": 100,
    "3": 270,
    "6": 500,
    "12": 900,
}

class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        owner = request.user
        today = now().date()

        # 🔥 DO NOT TRUST is_active
        members = Member.objects.filter(owner=owner)

        active_members = members.filter(expiry_date__gte=today)
        expired_members = members.filter(expiry_date__lt=today)

        total_revenue = 0

        revenue_by_plan = {
            "1 Month": 0,
            "3 Months": 0,
            "6 Months": 0,
            "12 Months": 0,
        }

        for member in active_members:
            # ✅ effective amount
            amount = (
                member.amount
                if member.amount is not None
                else MEMBERSHIP_PRICES.get(member.membership_type, 0)
            )

            total_revenue += amount

            if member.membership_type == "1":
                revenue_by_plan["1 Month"] += amount
            elif member.membership_type == "3":
                revenue_by_plan["3 Months"] += amount
            elif member.membership_type == "6":
                revenue_by_plan["6 Months"] += amount
            elif member.membership_type == "12":
                revenue_by_plan["12 Months"] += amount

        return Response({
            "total_members": members.count(),
            "active_members": active_members.count(),
            "expired_members": expired_members.count(),
            "total_revenue": total_revenue,
            "revenue_by_plan": revenue_by_plan,
        })
