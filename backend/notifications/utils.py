from members.utils import members_expiring_soon
from .services import send_whatsapp_reminder

def send_due_reminders():
    expiring_members = members_expiring_soon(days=3)

    for member in expiring_members:
        send_whatsapp_reminder(member)

    return expiring_members.count()
