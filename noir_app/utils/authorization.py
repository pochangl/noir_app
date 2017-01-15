from tastypie.authorization import DjangoAuthorization


class CustomDjangoAuthorization(DjangoAuthorization):
    def __init__(self, perm_code):
        super(CustomDjangoAuthorization, self).__init__()
        self.READ_PERM_CODE = perm_code