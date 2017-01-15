from django.db import models

# Create your models here.
class TimeStampModel(models.Model):
    modify_time = models.DateTimeField(auto_now=True)
    create_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True
#         ordering = ['modify_time']


class VersionedModel(TimeStampModel):
    version = models.PositiveIntegerField(default=0)

    class VersionConflict(Exception):
        pass

    class Meta:
        abstract = True


class EndorsedModel(models.Model):
    proposer = models.ForeignKey("auth.User", null=True, blank=True, related_name="%(class)s_proposer")
    confirmer = models.ForeignKey("auth.User", null=True, blank=True, related_name="%(class)s_confirmer")
    endorser = models.ForeignKey("auth.User", null=True, blank=True, related_name="%(class)s_endorser")
    
    class AlreadyProposed(Exception):
        pass

    class NoEmployee(Exception):
        pass

    class Meta:
        abstract = True

    def propose(self, user, employees):
        if this.employees.count() > 0:
            raise self.AlreadyProposed()
        elif len(employees) is 0:
            raise self.NoEmployee

        self.employees.add(employees)
        self.proposer = user
        self.save()

    def confirm(self, user):
        if not self.confirmer:
            self.confirmer = user
            self.endorser = None
            self.save()

    def endorse(self, user):
        if not self.endorser:
            self.endorser = user
            self.save()
