from urllib import response

import requests
from django.conf import settings
from members.models import Member
from django.utils.timezone import now

def send_whatsapp_reminder(member):
    message = (
        f"Hi {member.name}, 👋\n"
        f"Your gym membership expired on {member.expiry_date}.\n"
        f"Please renew to continue training 💪"
    )

    # DEV MODE (safe testing)
    if settings.WHATSAPP_MODE == "DEV":
        print(f"[DEV] WhatsApp → {member.phone}")
        print(message)
        return {"status": "dev_sent"}

    # PROD MODE (Meta WhatsApp Cloud API)
    url = f"https://graph.facebook.com/v18.0/{settings.WHATSAPP_PHONE_NUMBER_ID}/messages"

    payload = {
        "messaging_product": "whatsapp",
        "to": member.phone,
        "type": "template",
        "template": {
            "name": "membership_expiry_reminder",
            "language": {"code": "en_US"},
            "components": [
                {
                    "type": "body",
                    "parameters": [
                        {"type": "text", "text": member.name},
                        {"type": "text", "text": str(member.expiry_date)}
                    ]
                }
            ]
        }
    }

    headers = {
        "Authorization": f"Bearer {settings.WHATSAPP_ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)
    
    print("STATUS CODE:", response.status_code)
    print("RESPONSE:", response.text)

    return response.json()


def send_expired_members_reminders(owner):
    today = now().date()

    expired_members = Member.objects.filter(
        owner=owner,
        expiry_date__lt=today
    )
    print("Expired count:", expired_members.count())

    for member in expired_members:
        send_whatsapp_reminder(member)

    return expired_members.count()
