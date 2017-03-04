#-*- coding: utf-8 -*-
from account.models import RegistrationToken, Contact, Company, Employee
from project.models import Project, EmployeeAssignment, Assignment
# from transaction.models import Transaction, Receivable, PayCheck
from schedule.models import DayOff
import datetime
import noir_app.urls
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
try:
    edward = User.objects.get(username="edward")
except User.DoesNotExist:
    edward = User.objects.create(username="edward", password="password")

Token.objects.filter(user=edward).update(key='123')
edward.set_password('123')
edward.is_superuser = edward.is_staff = True
edward.save()



pAccount1 = Contact(name="Mark", title="foreman", address="Kaohsiung", phone="072234567",
                   mobile="0987654321", ssn="E123456711", birthday="1980-01-01")
pAccount1.save()
pAccount2 = Contact(name="Mary", title="manager", address="Tainan", phone="062234567",
                   mobile="0987654321", ssn="E123456722", birthday="1980-02-01")
pAccount2.save()
pAccount3 = Contact(name="Jack", title="staff", address="Kaohsiung", phone="073234567",
                   mobile="0987654321", ssn="E123456733", birthday="1980-03-01")
pAccount3.save()
pAccount4 = Contact(name="Jane", title="staff", address="Tainan", phone="063234567",
                   mobile="0987654321", ssn="E123456744", birthday="1980-04-01")
pAccount4.save()

pAccountC1 = Company(name="Company A",)
pAccountC1.save()
pAccountC2 = Company(name="Company B",)
pAccountC2.save()

pAccountE1 = Employee(contact=pAccount1)
pAccountE1.save()
pAccountE2 = Employee(contact=pAccount2)
pAccountE2.save()
pAccountE3 = Employee(contact=pAccount3)
pAccountE3.save()
pAccountE4 = Employee(contact=pAccount4)
pAccountE4.save()

#project設定
pProject1 = Project(contact=pAccount1, company=pAccountC1, name="SkyTower")
pProject1.save()
pProject2 = Project(contact=pAccount2, company=pAccountC2, name="MoonLand")
pProject2.save()


pProjectA1 = Assignment(project=pProject1, comment="",
                       start_datetime="2016-01-01 08:00", end_datetime="2016-01-01 17:00",
                       number_needed="1")
pProjectA1.save()
pProjectA2 = Assignment(project=pProject2, comment="",
                       start_datetime="2016-01-01 08:00", end_datetime="2016-01-01 17:00",
                       number_needed="1")
pProjectA2.save()
pProjectA3 = Assignment(project=pProject2, comment="",
                       start_datetime="2016-01-02 08:00", end_datetime="2016-01-02 17:00",
                       number_needed="1")
pProjectA3.save()
pProjectA4 = Assignment(project=pProject1, comment="",
                       start_datetime="2016-01-02 08:00", end_datetime="2016-01-02 17:00",
                       number_needed="1")
pProjectA4.save()

pProjectEA1 = EmployeeAssignment(employee=pAccountE1, assignment=pProjectA1)
pProjectEA1.save()
pProjectEA2 = EmployeeAssignment(employee=pAccountE2, assignment=pProjectA2)
pProjectEA2.save()
pProjectEA3 = EmployeeAssignment(employee=pAccountE3, assignment=pProjectA2)
pProjectEA3.save()
pProjectEA4 = EmployeeAssignment(employee=pAccountE4, assignment=pProjectA1)
pProjectEA4.save()
pProjectEA5 = EmployeeAssignment(employee=pAccountE1, assignment=pProjectA3)
pProjectEA5.save()
pProjectEA6 = EmployeeAssignment(employee=pAccountE2, assignment=pProjectA3)
pProjectEA6.save()
pProjectEA7 = EmployeeAssignment(employee=pAccountE3, assignment=pProjectA4)
pProjectEA7.save()
pProjectEA8 = EmployeeAssignment(employee=pAccountE4, assignment=pProjectA4)
pProjectEA8.save()

#schedule設定
pScheduleD1 = DayOff(employee=pAccountE1,
                    start_datetime="2016-02-03 08:00",
                    end_datetime="2016-02-02 17:00")
pScheduleD1.save()
pScheduleD2 = DayOff(employee=pAccountE2,
                    start_datetime="2016-02-03 08:00",
                    end_datetime="2016-02-02 17:00")
pScheduleD2.save()
pScheduleD3 = DayOff(employee=pAccountE3,
                    start_datetime="2016-02-03 08:00",
                    end_datetime="2016-02-02 17:00")
pScheduleD3.save()
pScheduleD4 = DayOff(employee=pAccountE4,
                    start_datetime="2016-02-03 08:00",
                    end_datetime="2016-02-02 17:00")
pScheduleD4.save()
