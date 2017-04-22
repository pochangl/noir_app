from django.contrib.auth import get_user_model, logout
from rest_framework import generics, viewsets, mixins, permissions
from . import models
from . import serializers
from account.models import Employee, Company
from utils.permissions import AnonymousOnlyPermission


class ContactView(viewsets.ModelViewSet):
    serializer_class = serializers.ContactSerializer
    queryset = models.Contact.objects.all()


class EmployeeListView(generics.ListAPIView):
    serializer_class = serializers.EmployeeSerializer
    queryset = models.Employee.objects.filter(is_active=True)


class EmployeeView(viewsets.ModelViewSet):
    serializer_class = serializers.EmployeeSerializer
    queryset = models.Employee.objects.filter(is_active=True)

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()


class CompanyView(viewsets.ModelViewSet):
    serializer_class = serializers.CompanySerializer
    queryset = models.Company.objects.filter(is_active=True)

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()


class CompanyListView(generics.ListAPIView):
    serializer_class = serializers.CompanySerializer
    queryset = models.Company.objects.filter(is_active=True)




class UserView(generics.RetrieveAPIView):
    '''
        Retrieve basic user infomation for enabling certain feature in the app
        But do not rely on this information to do permission check
        API itself need to handle permission
    '''
    serializer_class = serializers.UserSerializer

    def get_object(self):
        return self.request.user


# class SignupView(generics.CreateAPIView):
#     '''
#         description:
#             signup api
#             only unauthenticated can use this function
#         fields:
#             username:
#                 username
#             password:
#                 account pasword
#     '''
#     queryset = get_user_model().objects.all()
#     serializer_class = serializers.SignupSerializer
#     permission_classes = (AnonymousOnlyPermission,)


class AuthView(mixins.CreateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    '''
        description:
            authentication
        fields:
            username:
                username
            password:
                account password
    '''
    serializer_class = serializers.LoginSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        return self.create(request)

    def delete(self, request):
        return self.destroy(request)

    def get_object(self):
        return None

    def perform_destroy(self, instance):
        logout(self.request)
