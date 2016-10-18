#-*- coding: utf-8 -*-
from account.models import RegistrationToken, Contact, Client, Employee, Skill
from project.models import Project, EmployeeAssignment, Assignment
from transaction.models import Transaction, Debt, Receivable, PayCheck
from schedule.models import DayOff, EmployeePreference, ProjectPreference
import datetime

from django.contrib.auth.models import User
edward = User.objects.get(username="edward")


pAccount1 = Contact(name="Mark", title="foreman", address="Kaohsiung", phone="072234567",
                   mobile="0987654321", pid="E123456711", birthday="1980-01-01")
pAccount1.save()
pAccount2 = Contact(name="Mary", title="manager", address="Tainan", phone="062234567",
                   mobile="0987654321", pid="E123456722", birthday="1980-02-01")
pAccount2.save()
pAccount3 = Contact(name="Jack", title="staff", address="Kaohsiung", phone="073234567",
                   mobile="0987654321", pid="E123456733", birthday="1980-03-01")
pAccount3.save()
pAccount4 = Contact(name="Jane", title="staff", address="Tainan", phone="063234567",
                   mobile="0987654321", pid="E123456744", birthday="1980-04-01")
pAccount4.save()

pAccountC1 = Client(company="Company A",)
pAccountC1.save()
pAccountC2 = Client(company="Company B",)
pAccountC2.save()

pAccountE1 = Employee(contact=pAccount1, title="staff")
pAccountE1.save()
pAccountE2 = Employee(contact=pAccount2, title="manager")
pAccountE2.save()
pAccountE3 = Employee(contact=pAccount3, title="staff")
pAccountE3.save()
pAccountE4 = Employee(contact=pAccount4, title="staff")
pAccountE4.save()

pAccountS1 = Skill(employee=pAccountE1, name="striker")
pAccountS1.save()
pAccountS2 = Skill(employee=pAccountE2, name="welder")
pAccountS2.save()
pAccountS3 = Skill(employee=pAccountE3, name="striker")
pAccountS3.save()
pAccountS4 = Skill(employee=pAccountE4, name="welder")
pAccountS4.save()

#project設定
pProject1 = Project(contact=pAccount1, client=pAccountC1, name="SkyTower")
pProject1.save()
pProject2 = Project(contact=pAccount2, client=pAccountC2, name="MoonLand")
pProject2.save()


pProjectA1 = Assignment(project=pProject1, comment="",
                       start_datetime="2016-01-01 08:00", end_datetime="2016-01-01 17:00",
                       approved=True, 
                       assignee=edward, number_needed="1", serial="2016-01-01-SkyTower")
pProjectA1.save()
pProjectA2 = Assignment(project=pProject2, comment="",
                       start_datetime="2016-01-01 08:00", end_datetime="2016-01-01 17:00",
                       approved=True, 
                       assignee=edward, number_needed="1", serial="2016-01-01-MoonLand")
pProjectA2.save()
pProjectA3 = Assignment(project=pProject2, comment="",
                       start_datetime="2016-01-02 08:00", end_datetime="2016-01-02 17:00",
                       approved=True, 
                       assignee=edward, number_needed="1", serial="2016-01-02-MoonLand")
pProjectA3.save()

pProjectEA1 = EmployeeAssignment(employee=pAccountE1, assignment=pProjectA1, selected=True,
                              check_in="2016-01-01 07:30", check_out="2016-01-01 17:30",
                              pay="1000", actual_pay="1000",)
pProjectEA1.save()
pProjectEA2 = EmployeeAssignment(employee=pAccountE2, assignment=pProjectA2, selected=True,
                              check_in="2016-01-01 07:30", check_out="2016-01-01 17:30",
                              pay="1000", actual_pay="1000", )
pProjectEA2.save()
pProjectEA3 = EmployeeAssignment(employee=pAccountE3, assignment=pProjectA2, selected=True,
                              check_in="2016-01-01 07:30", check_out="2016-01-01 17:30",
                              pay="1000", actual_pay="1000",)
pProjectEA3.save()
pProjectEA4 = EmployeeAssignment(employee=pAccountE4, assignment=pProjectA1, selected=True,
                              check_in="2016-01-01 07:30", check_out="2016-01-01 17:30",
                              pay="1000", actual_pay="1000", )
pProjectEA4.save()


#transaction設定
pTransactionD1 = Debt(amount="1500", note="Note", employee=pAccountE1)
pTransactionD1.save()
pTransactionD2 = Debt(amount="2500", note="Note", employee=pAccountE2)
pTransactionD2.save()
pTransactionD3 = Debt(amount="3500", note="Note", employee=pAccountE3)
pTransactionD3.save()
pTransactionD4 = Debt(amount="4500", note="Note", employee=pAccountE4)
pTransactionD4.save()

pTransactionR = Receivable(amount="3000", note="Note", client=pAccountC1)
pTransactionR.save()
pTransactionR = Receivable(amount="4000", note="Note", client=pAccountC2)
pTransactionR.save()

pTransactionP1 = PayCheck(amount="5000", note="Note", employee=pAccountE1,
                         reason_code="reason_code",reason="salary")
pTransactionP1.save()
pTransactionP2 = PayCheck(amount="6000", note="Note", employee=pAccountE2,
                         reason_code="reason_code",reason="bonus")
pTransactionP2.save()
pTransactionP3 = PayCheck(amount="7000", note="Note", employee=pAccountE3,
                         reason_code="reason_code",reason="salary")
pTransactionP3.save()
pTransactionP4 = PayCheck(amount="8000", note="Note", employee=pAccountE4,
                         reason_code="reason_code",reason="bonus")
pTransactionP4.save()

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

pScheduleEA1 = EmployeePreference(employee_assignment=pProjectEA1, employee_preference="1")
pScheduleEA1.save()
pScheduleEA2 = EmployeePreference(employee_assignment=pProjectEA2, employee_preference="1")
pScheduleEA2.save()

pSchedulePP = ProjectPreference(employee_assignment=pProjectEA1,employee_priority="high",
                                project_priority="middle")
pSchedulePP.save()
pSchedulePP = ProjectPreference(employee_assignment=pProjectEA2,employee_priority="middle",
                                project_priority="high")
pSchedulePP.save()
