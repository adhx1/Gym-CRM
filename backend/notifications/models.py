from django.db import models
from members.models import Member

class Notification(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    sent_at = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=50)
