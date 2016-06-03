from tastypie.resources import ModelResource, fields
from account import models
from account import models as account_models
from tastypie.authentication import ApiKeyAuthentication
from tastypie.authorization import ReadOnlyAuthorization
from project import models
#from account.resources import ContactResource, ClientResource


class ProjectResource(ModelResource):
    #contact = fields.OneToOneField(ContactResource, attribute="contact", full=True)
    contact = fields.OneToOneField("account.ContactResource", attribute="contact", related_name="projects")
    client = fields.ForeignKey("account.ClientResource", attribute="client", related_name="projects")
    
    class Meta:
        queryset = models.Project.objects.all()
        fields = ("id","name",)


class EmployeeResource(ModelResource):
    class Meta:
        queryset = account_models.Employee.objects.all()
        fields = ("id", "name",)


class EmployeeProjectResource(ModelResource):
    project = fields.ForeignKey("project.ProjectResource", attribute="project", related_name="employees")
    employee = fields.ForeignKey("accnout.EmployeeResource", attribute="employee", related_name="projects")

    class Meta:
        queryset = account_models.EmployeeProject.objects.all()
        resource_name = "employee_project"
        fields = ("id", )
        authentcation = ApiKeyAuthentication()
        authorization = ReadOnlyAuthorization()
