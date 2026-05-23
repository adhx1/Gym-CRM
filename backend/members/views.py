from rest_framework.viewsets import ModelViewSet
from .models import Member
from .serializers import MemberSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .utils import expire_members


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
