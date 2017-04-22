from rest_framework.authentication import BaseAuthentication
from django.contrib.auth import get_user_model


# class FakeAuthentication(BaseAuthentication):
#     def authenticate(self, request):
#         User = get_user_model()
#         root = User.objects.get(id=1)
#         return (root, None)

