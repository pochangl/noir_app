from django.db import models

# Create your models here.
class TimeStampModel(models.Model):
    modify_time = models.DateTimeField(auto_now=True)
    create_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True