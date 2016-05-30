from tastypie.resources import ModelResource, fields
from account import models
from account import models as account_models
from tastypie.authentication import ApiKeyAuthentication
from tastypie.authorization import ReadOnlyAuthorization


class ProjectResource(ModelResource):
    class Meta:
        queryset = models.Project.objects.all()
        fields = ("id","name",)


class EmployeeResource(ModelResource):
    class Meta:
        queryset = account_models.Employee.objects.all()
        fields = ("id", "name",)


class EmployeeProjectResource(ModelResource):
    project = fields.ForeignKey(ProjectResource, attribute="project", related_name="employees")
    employee = fields.ForeignKey(EmployeeResource, attribute="employee", related_name="projects")

    class Meta:
        queryset = models.EmployeeProject.objects.all()
        resource_name = "employee_project"
        fields = ("id", )
        authentcation = ApiKeyAuthentication()
        authorization = ReadOnlyAuthorization()
