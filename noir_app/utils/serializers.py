from rest_framework import serializers, validators

def positive_validator(value):
    if value < 0:
        raise serializers.ValidationError('This field must be greater than zero')

class PositiveFloatField(serializers.FloatField):
    def __init__(self, *args, **kwargs):
        validators = kwargs.get("validators", list())
        validators.append(positive_validator)
        kwargs["validators"] = validators
        super(PositiveFloatField, self).__init__(*args, **kwargs)