from rest_framework import viewsets
from . import models, serializers, filters


class DayOffViewSet(viewsets.ModelViewSet):
    queryset = models.DayOff.objects.all()
    serializer_class = serializers.DayOffSerializer
    filter_class = filters.DayOffFilter
