'''
    general purpose test mixins
'''
import json
import copy
from django.test import Client
from django.urls import reverse
from django.contrib.auth import get_user_model


User = get_user_model()


class UserSetupMixin(object):
    '''
        handful testing functions
        client_class allows user to replace default client class
    '''
    _user_count = 0
    client_class = Client

    def get_password(self, username):
        '''
            rebuild password from username
        '''
        return '%s_psw' % username

    def create_user(self, username=None, **old_kwargs):
        '''
            create a user account for test
        '''
        if username is None:
            username = '%d' % self._user_count
            self._user_count += 1
        kwargs = copy.deepcopy(old_kwargs)
        kwargs.update({
            'password': kwargs.get('password', self.get_password(username)),
            'username': username,
            'email': kwargs.get('email', '%s@example.com' % username),
        })
        user = User.objects.create_user(**kwargs)
        user.save()
        return user


class ClientSetupMixin(UserSetupMixin):
    def assertJSONContent(self, content, json_obj):
        data = json.loads(str(content))
        for key, value in json_obj.items():
            if isinstance(value, dict):
                self.assertJSONContent(data[key], value)
            else:
                self.assertEqual(data[key], value, 'key %s doesn\'t match' % key)

    def assertResponse(self, response, status_code, error_message):
        self.assertEqual(
            response.status_code, status_code,
            '\n\nError message:\n %s.\nFailed with status code: \n %d, \nResponse: \n %s' %
            (error_message, response.status_code, response.content)
        )

    def get_anonymous_client(self):
        return self.client_class()

    def get_logged_in_client(self, user=None):
        '''
            return a logged in client
            user model can be found in client.user
        '''
        user = user if user else self.create_user()

        client = self.client_class()
        client.post(reverse('login'), {
            'username': user.username,
            'password': self.get_password(user.username)})
        client.user = user
        return client


class UrlTestMixin(ClientSetupMixin):
    '''
        test whether the url existed
    '''
    @property
    def urls(self):
        raise NotImplementedError()

    def test_urls(self):
        '''
            check if every url is valid
            pre-requisite:
                self.urls must be defined

            input:
                self.urls
                array of URL Object
            return:
                does not return but throws assertion error if response.status_code does not meet expectation

            Url Object
                string: # if object is a string
                    expect 200 with anonymous accces

                dict: # object is a dictionary
                    url:
                        url string
                        required if name is not present
                    name:
                        url name
                        required if url is not present
                    params <optional, default={}>:
                        parameters passing to the reverse function, used to rebuild url
                    logged_in >optional, default=False>:
                        whether the url should be accessed through a logged in client
                    status_code <optional, default=200>:
                        expected status code, if the response does not match, assertion error will be raised
        '''
        anonymous_client = self.get_anonymous_client()
        logged_in_client = self.get_logged_in_client()

        for url in self.urls:
            if isinstance(url, str):  # if string
                method = 'get'
                url = url
                client = anonymous_client
                status_code = 200
            elif not isinstance(url, dict):
                raise Exception('unknown url object')
            else:  # if dictionary
                method = url.get('method', 'get').lower()
                client = logged_in_client if url.get('logged_in', False) else anonymous_client
                status_code = url.get('status_code', 200)
                url = url['url'] if 'url' in url else reverse(url['name'], url.get('params', {}))

            # make request
            response = getattr(client, method)(url)

            # check if status code matches
            self.assertEqual(status_code, response.status_code,
                             'the url %s does not return the expected status code %d, returned %d instead with the following body %s' %
                             (url, status_code, response.status_code, response.content)
            )
        