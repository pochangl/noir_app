#-*- coding: utf-8 -*-
from account.models import Contact, Client, Employee, Skill
from project.models import Project, EmployeeProject, Assignment
from transaction.models import Transaction, Debt, Receivable, PayCheck
from schedule.models import DayOff, EmployeePreference, ProjectPreference
import datetime


#account設定
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

pAccountS1 = Skill(employee=pAccountE1, name="striker")
pAccountS1.save()
pAccountS2 = Skill(employee=pAccountE2, name="welder")
pAccountS2.save()

#project設定
pProject1 = Project(contact=pAccount1, client=pAccountC1, name="SkyTower", number_needed="2")
pProject1.save()
pProject2 = Project(contact=pAccount2, client=pAccountC2, name="MoonLand", number_needed="3")
pProject2.save()

pProjectEP1 = EmployeeProject(employee=pAccountE1, project=pProject1)
pProjectEP1.save()
pProjectEP2 = EmployeeProject(employee=pAccountE2, project=pProject2)
pProjectEP2.save()
pProjectEP3 = EmployeeProject(employee=pAccountE1, project=pProject2)
pProjectEP3.save()
pProjectEP4 = EmployeeProject(employee=pAccountE2, project=pProject1)
pProjectEP4.save()


pProjectA = Assignment(employee_project=pProjectEP1, assignment="assignment A",
                       start_time="2016-01-01 08:00", end_time="2016-01-01 17:00",
                       check_in="2016-01-01 07:30", check_out="2016-01-01 17:30",
                       status="approved", pay="1000", actual_pay="1000", slected=True)
pProjectA.save()
pProjectA = Assignment(employee_project=pProjectEP2, assignment="assignment B",
                       start_time="2016-01-01 08:00", end_time="2016-01-01 17:00",
                       check_in="2016-01-01 07:30", check_out="2016-01-01 17:30",
                       status="approved", pay="1000", actual_pay="1000", slected=True)
pProjectA.save()

#transaction設定
pTransactionD = Debt(amount="1500", note="Note", employee=pAccountE1)
pTransactionD.save()
pTransactionD = Debt(amount="2500", note="Note", employee=pAccountE2)
pTransactionD.save()

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

#schedule設定
pScheduleD = DayOff(employee=pAccountE1,start_time="2016-01-02 08:00",
                    end_time="2016-01-02 17:00")
pScheduleD.save()
pScheduleD = DayOff(employee=pAccountE2,start_time="2016-02-02 08:00",
                    end_time="2016-02-02 17:00")
pScheduleD.save()

pScheduleEP = EmployeePreference(employee_project=pProjectEP1, employee_preference="1")
pScheduleEP.save()
pScheduleEP = EmployeePreference(employee_project=pProjectEP2, employee_preference="1")
pScheduleEP.save()

pSchedulePP = ProjectPreference(employee_project=pProjectEP1,employee_priority="high",
                                project_priority="middle")
pSchedulePP.save()
pSchedulePP = ProjectPreference(employee_project=pProjectEP2,employee_priority="middle",
                                project_priority="high")
pSchedulePP.save()
