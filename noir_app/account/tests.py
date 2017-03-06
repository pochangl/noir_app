'''
Created on Mar 4, 2017

@author: pochangl
'''
from django.contrib.auth import authenticate
from django.test import TestCase
from django.urls import reverse
from utils.tests import UrlTestMixin


class AuthTest(UrlTestMixin, TestCase):
    urls = [
        {
            'url': '/api/v1/account/auth/',
            'logged_in': False,
            'method': 'post',
            'status_code': 400
        },
        {
            'url': '/api/v1/account/auth/',
            'logged_in': True,
            'method': 'post',
            'status_code': 400
        },
        {
            'url': '/api/v1/account/auth/',
            'logged_in': False,
            'method': 'delete',
            'status_code': 204
        },
        {
            'url': '/api/v1/account/auth/',
            'logged_in': True,
            'method': 'delete',
            'status_code': 204
        }
    ]

    def test_auth(self):
        """
            test complete log in log out flow
            using user view to verify whether a user is logged in or not
        """
        user = self.create_user()
        client = self.get_anonymous_client()

        # login
        response = client.post(
            reverse('account:auth'),
            {
                'username': user.username,
                'password': self.get_password(user.username)
            }
        )
        self.assertResponse(response, 201, 'login failed')

        # verify if client has been logged in
        response = client.get(reverse('account:user'))
        self.assertResponse(response, 200, 'user failed')
        self.assertJSONContent(response.content, {'id': user.id})

        # logout
        response = client.delete(reverse('account:auth'))
        self.assertResponse(response, 204, 'logout failed')

        # verify if client has been logged out
        response = client.get(reverse('account:user'))
        self.assertResponse(response, 403, 'logout not effective')

    def test_wrong_login_credential(self):
        """
            test login with error auth credential
        """
        user = self.create_user()
        client = self.get_anonymous_client()

        # log in with wrong credential
        response = client.post(
            reverse('account:auth'),
            {
                'username': user.username,
                'password': self.get_password(user.username) + 'u'  # intended typo for wrong credential
            }
        )

        self.assertResponse(response, 400, 'the user should not be logged in')

        # test if logged in
        response = client.get(reverse('account:user'))
        self.assertResponse(response, 403, 'the user is unexpectedly logged in')


class SignupTest(UrlTestMixin, TestCase):
    urls = [
        {
            'url': '/api/v1/account/signup/',
            'logged_in': False,
            'method': 'post',
            'status_code': 400
        },
        {
            'url': '/api/v1/account/signup/',
            'logged_in': True,
            'method': 'post',
            'status_code': 403
        },
    ]

    def test_signup(self):
        username = 'test'
        password = self.get_password(username)

        client = self.get_anonymous_client()
        response = client.post(reverse('account:signup'), {
            'username': username,
            'password': password,
        })
        self.assertResponse(response, 201, 'could not register user')
        user = authenticate(username=username, password=password)
        self.assertNotEqual(user, None, 'registration failed')
