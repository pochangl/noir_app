from django.db import models

from utils.models import TimeStampModel

from account.models import Employee
from project.models import EmployeeAssignment
    

# Create your models here.    
class DayOff(TimeStampModel):
    employee = models.ForeignKey(Employee, related_name='dayoffs')
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    
    def __str__(self):
        return "%s: %s" % (self.employee.contact.name, self.start_datetime)


class EmployeePreference(TimeStampModel):
    employee_assignment = models.ForeignKey(EmployeeAssignment, related_name='employee_preferences')
    employee_preference = models.IntegerField(default=0)

    def __repr__(self):
        return "%s: %s" % (self.employee_project, self.employee_preference)
    
    
class ProjectPreference(TimeStampModel):
    employee_assignment = models.ForeignKey(EmployeeAssignment, related_name='project_preferences')
    employee_priority = models.CharField(max_length=128)
    project_priority = models.CharField(max_length=128)

    def __repr__(self):
        return "%s: %s: %s" % (self.employee_project, self.employee_priority, self.project_priority)
    