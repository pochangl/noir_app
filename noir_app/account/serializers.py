
from django.contrib.auth import get_user_model, authenticate, login
from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers
from . import models

User = get_user_model()


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Contact
        fields = ('id', 'name', 'title', 'address', 'phone', 'mobile', 'ssn', 'birthday')
        extra_kwargs = {
            "id": {
                "read_only": False,
                "required": False,
            },
        }


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Company
        fields = ('id', 'name', 'is_active')


class EmployeeSerializer(serializers.ModelSerializer):
    contact = ContactSerializer(read_only=True)

    class Meta:
        model = models.Employee
        fields = ('id', 'contact', 'is_active')

    def create(self, validated_data):
        data = dict(validated_data)
        data['contact'] = models.Contact.objects.get(id=self.initial_data['contact']['id'])
        return models.Employee.objects.create(**data)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('is_active', 'is_staff', 'last_name', 'first_name', 'id')


class CredentialSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    class Meta:
        fields = ('username', 'password')


# class SignupSerializer(CredentialSerializer):
#     def validate_username(self, username):
#         '''
#             check whether a user has already exist
#         '''
#         try:
#             User.objects.get(username=username)
#         except User.DoesNotExist:
#             return username
#         else:
#             raise serializers.ValidationError(_('The username %s has been used') % username)
# 
#     def create(self, validated_data):
#         '''
#             user creationg
#         '''
#         return User.objects.create_user(**validated_data)


class LoginSerializer(CredentialSerializer):
    '''
        give login credential
        login the user if the credentail is correct
    '''
    def is_valid(self, *args, **kwargs):
        '''
            check if username and password is correct
        '''
        valid = super(LoginSerializer, self).is_valid(*args, **kwargs)
        if not valid:
            return False
        data = self.validated_data
        user = authenticate(username=data['username'], password=data['password'])
        if user is None:
            raise serializers.ValidationError(_('Login credential is invalid'))
        else:
            return user

    def create(self, validated_data):
        '''
            login the user
        '''
        user = User.objects.get(username=validated_data['username'])
        login(self._context['request'], user)
        return user