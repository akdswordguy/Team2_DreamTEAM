from django.db import models
from chowkidar.models import AbstractRefreshToken
from ipware import get_client_ip


class RefreshToken(AbstractRefreshToken, models.Model):
    ip = models.GenericIPAddressField(null=True, blank=True)
    userAgent = models.CharField(max_length=255, null=True, blank=True)

    def process_request_before_save(self, request):
        ip, is_routable = get_client_ip(request)
        self.ip = ip
        self.userAgent = request.headers.get("User-Agent", None)
