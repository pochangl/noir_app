from django.db import models

from utils.models import TimeStampModel

from account.models import Employee
    

# Create your models here.    
class DayOff(TimeStampModel):
    employee = models.ForeignKey(Employee, related_name='dayoffs')
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    
    def __str__(self):
        return "%s: %s" % (self.employee.contact.name, self.start_datetime)
