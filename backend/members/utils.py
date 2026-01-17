from datetime import date
from .models import Member

def expire_members():
    today = date.today() 
    expired_members = Member.objects.filter(expiry_date__lt=today, is_active=True)


    for member in expired_members:
        member.is_active = False
        member.save()

    return expired_members.count()


from datetime import timedelta

def members_expiring_soon(days=3):
    today = date.today()
    return Member.objects.filter(
        expiry_date__lte=today + timedelta(days=days),
        expiry_date__gte=today
    )
