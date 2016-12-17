from tastypie.resources import ModelResource, fields, Resource
from tastypie.authentication import ApiKeyAuthentication
from tastypie.authorization import ReadOnlyAuthorization, DjangoAuthorization
from schedule.models import DayOff, EmployeePreference, ProjectPreference
from account.resources import EmployeeResource
from project.resources import EmployeeAssignmentResource
import calendar
from tastypie.constants import ALL, ALL_WITH_RELATIONS

class ScheduleResource(Resource):
    class Meta:
        resource_name = 'calendar'
        detail_allowed_methods = ['get']
        detail_uri_name = 'year'
        calendar = calendar.Calendar(6)
        # include_resource_uri = False

    def obj_get(self, bundle, year):
        year = int(year)
        return {
            "year": year,
            "monthes": self._meta.calendar.yeardayscalendar(year, 12)[0]
        }

    def full_dehydrate(self, bundle, for_list=False):
        bundle.data = bundle.obj
        return bundle

class DayOffDateResource(Resource):
    class Meta:
        include_resource_uri = False
        resource_name = 'dayoff_date'
        queryset = DayOff.objects.datetimes('start_datetime', 'day').reverse()

    def obj_get_list(self, *args, **kwargs):
        return self._meta.queryset

    def dehydrate(self, bundle, *args, **kwargs):
        bundle.data['date'] = bundle.obj.date()
        return bundle


class DayOffResource(ModelResource):
    employee = fields.ForeignKey(EmployeeResource, attribute="employee", full=True)

    class Meta:
        always_return_data = True
        queryset = DayOff.objects.all()
        resource_name = "dayoff"
        include_resource_uri = False
        fields = ("id", "start_datetime", "end_datetime",)
        filtering = {
            "employee": ('exact',),
            "start_datetime": ALL,
        }
        allowed_methods = ['get','post','put', 'delete']
        authentication = ApiKeyAuthentication()
        authorization = DjangoAuthorization()

    def dehydrate(self, bundle, *args, **kwargs):
        bundle = super(DayOffResource, self).dehydrate(bundle)
        dayoff = bundle.obj
        bundle.data["start_date"] = dayoff.start_datetime.date()
        bundle.data["start_time"] = dayoff.start_datetime.time()
        bundle.data["end_date"] = dayoff.end_datetime.date()
        bundle.data["end_time"] = dayoff.end_datetime.time()
        return bundle


class EmployeePreferenceResource(ModelResource):
    employee_assignment = fields.ForeignKey(EmployeeAssignmentResource, attribute="employee_assignment", related_name="employee_preferences")

    class Meta:
        queryset = EmployeePreference.objects.all()
        resource_name = "employee_preference"
        fields = ("id", "employee_preference",)
        authentication = ApiKeyAuthentication()


class ProjectPreferenceResource(ModelResource):
    employee_assignment = fields.ForeignKey(EmployeeAssignmentResource, attribute="employee_assignment", related_name="project_preferences")

    class Meta:
        queryset = ProjectPreference.objects.all()
        resource_name = "project_preference"
        fields = ("id", "employee_priority", "project_priority",)
        authentication = ApiKeyAuthentication()
