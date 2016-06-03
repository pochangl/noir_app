from tastypie.resources import ModelResource, fields
from project import models
from tastypie.authentication import ApiKeyAuthentication
from tastypie.authorization import ReadOnlyAuthorization

#from account.resources import ContactResource, ClientResource
class ProjectResource(ModelResource):
    #contact = fields.OneToOneField(ContactResource, attribute="contact", full=True)
    contact = fields.OneToOneField("account.ContactResource", attribute="contact", related_name="projects")
    client = fields.ForeignKey("account.ClientResource", attribute="client", related_name="projects")
    
    class Meta:
        queryset = models.Project.objects.all()
        resource_name = "project"
        fields = ("id","name",)
        authentcation = ApiKeyAuthentication()


class AssignmentResource(ModelResource):
    employee_project = fields.ForeignKey("account.EmployeeProjectResource", attribute="employee_project", related_name="assignments")

    class Meta:
        queryset = models.Assignment.objects.all()
        resource_name = "assignment"
        fields = ("id", "assignment", "start_time", "end_time", "check_in", "check_out", "status", "pay", "actual_pay", )
        authentcation = ApiKeyAuthentication()
        