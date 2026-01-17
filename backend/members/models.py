from django.db import models
from django.utils.timezone import now
from datetime import timedelta
from owners.models import Owner

def today_date():
    return now().date()

MEMBERSHIP_PRICES = {
    "1": 800,
    "3": 2400,
    "6": 4800,
    "12": 9600,
}

class Member(models.Model):

    MEMBERSHIP_CHOICES = [
        ("1", "1 Month"),
        ("3", "3 Months"),
        ("6", "6 Months"),
        ("12", "12 Months"),
    ]

    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)

    join_date = models.DateField(default=today_date)

    membership_type = models.CharField(
        max_length=2,
        choices=MEMBERSHIP_CHOICES,
        default="1",
    )

    amount = models.DecimalField(
        max_digits=8,
          decimal_places=2,
           null=True,
           blank=True


    )

    expiry_date = models.DateField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        months = int(self.membership_type)
        self.expiry_date = self.join_date + timedelta(days=30 * months)

        if self.amount is None:
            self.amount = MEMBERSHIP_PRICES.get(self.membership_type, 0)
        self.is_active = self.expiry_date >= now().date()
        
        
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} - {self.phone}"
