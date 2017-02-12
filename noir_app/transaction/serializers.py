from rest_framework import serializers

from . import models


class PersonalAccountBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PersonalAccountBalance
        fields = ('balance', 'income', 'expense', 'note', 'date',)
