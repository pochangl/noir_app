from tastypie.resources import ModelResource, fields
from account import models
from account import models as account_models
from tastypie.authentication import ApiKeyAuthentication
from tastypie.authorization import ReadOnlyAuthorization

#from transaction.resources import DebtResource
class ContactResource(ModelResource):
    class Meta:
        queryset = models.Contact.objects.all()
        resource_name = "contact"
        fields = ("id", "name", "title", "address", "phone", "mobile", "pid", "birthday",)
        authentcation = ApiKeyAuthentication()


class ClientResource(ModelResource):
    class Meta:
        queryset = models.Client.objects.all()
        resource_name = "client"
        fields = ("id", "company",)
        authentcation = ApiKeyAuthentication()


class EmployeeResource(ModelResource):
    contact = fields.OneToOneField("account.ContactResource", attribute="contact", related_name="employees")
    debt = fields.ForeignKey("transaction.DebtResource", attribute="debt", related_name="employees")
    
    class Meta:
        queryset = models.Employee.objects.all()
        resource_name = "employee"
        fields = ("id","title",)
        authentcation = ApiKeyAuthentication()
        

class DayOffResource(ModelResource):
    employee = fields.ForeignKey("account.Employee", attribute="employee", related_name="dayoffs")
    
    class Meta:
        queryset = models.DayOff.objects.all()
        resource_name = "dayoff"
        fields = ("id","start_time", "end_time",)
        authentcation = ApiKeyAuthentication()
       
   
class SkillResource(ModelResource):
    employee = fields.ForeignKey("account.EmployeeResource", attribute="employee", related_name="skills")
    
    class Meta:
        queryset = models.Skill.objects.all()
        resource_name = "skill"
        fields = ("id","name",)
        authentcation = ApiKeyAuthentication()
        
        
class EmployeeProjectResource(ModelResource):
    employee = fields.ForeignKey("accnout.EmployeeResource", attribute="employee", related_name="employee_projects")
    project = fields.ForeignKey("project.ProjectResource", attribute="project", related_name="employee_projects")

    class Meta:
        queryset = account_models.EmployeeProject.objects.all()
        resource_name = "employee_project"
        fields = ("id", )
        authentcation = ApiKeyAuthentication()
        authorization = ReadOnlyAuthorization()
 
 
class EmployeePreferenceResource(ModelResource):
    employee_project = fields.ForeignKey("account.EmployeeProject", attribute="employee_project", related_name="employee_preferences")
    
    class Meta:
        queryset = models.EmployeePreference.objects.all()
        resource_name = "employee_preference"
        fields = ("id", "employee_preference",)
        authentcation = ApiKeyAuthentication()
        
   
class ProjectPreferenceResource(ModelResource):
    employee_project = fields.ForeignKey("account.EmployeeProject", attribute="employee_project", related_name="project_preferences")
    
    class Meta:
        queryset = models.ProjectPreference.objects.all()
        resource_name = "project_preference"
        fields = ("id", "employee_priority", "project_priority",)
        authentcation = ApiKeyAuthentication()
             