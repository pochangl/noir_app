from django.db import models

# Create your models here.
class TimeStampModel(models.Model):
#     modify_time = models.DateTimeField(auto_now=True)
    modify_date = models.DateField(auto_now=True)
    modify_time = models.TimeField(auto_now=True)
#     create_time = models.DateTimeField(auto_now_add=True)
    create_date = models.DateField(auto_now_add=True)
    create_time = models.TimeField(auto_now_add=True)

    class Meta:
        abstract = True
#         ordering = ['modify_time']
