from django.db import models
from members.models import Member
from datetime import timedelta

class Subscription(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    start_date = models.DateField()
    duration_months = models.IntegerField(default=1)
    end_date = models.DateField(blank=True, null=True)
    status = models.CharField(
        max_length=10,
        choices=[("PAID", "PAID"), ("UNPAID", "UNPAID")],
        default="PAID"
    )

    def save(self, *args, **kwargs):
        # Auto-calculate end date
        self.end_date = self.start_date + timedelta(days=30 * self.duration_months)

        # Update member status
        self.member.expiry_date = self.end_date
        self.member.is_active = True
        self.member.save()

        super().save(*args, **kwargs)
