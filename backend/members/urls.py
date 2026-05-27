from rest_framework.routers import DefaultRouter
from .views import MemberViewSet
from django.urls import path
from .views import ExpireMembersView
from .views import MarkMemberPaidView
router = DefaultRouter()
router.register("", MemberViewSet, basename="member")

urlpatterns = router.urls


urlpatterns += [
    path("expire/", ExpireMembersView.as_view()),
    path("<int:id>/mark-paid/", MarkMemberPaidView.as_view()),
]
