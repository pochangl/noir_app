from django.db import models
from django.utils import timezone
from rest_framework import exceptions
from django.utils.translation import ugettext_lazy as _


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

    propose_time = models.DateField(null=True, blank=True, default=None)
    confirm_time = models.DateField(null=True, blank=True, default=None)
    endorse_time = models.DateField(null=True, blank=True, default=None)
    
    class AlreadyProposed(exceptions.PermissionDenied):
        default_detail = _('This list is already proposed.')

    class Meta:
        abstract = True

    def propose(self, user):
        self.proposer = user
        self.propose_time = timezone.now()
        self.save()

    def confirm(self, user):
        if not self.confirmer and not self.endorser:
            self.confirmer = user
            self.confirm_time = timezone.now()
            self.save()

    def endorse(self, user):
        if not self.endorser:
            self.endorser = user
            self.endorse_time = timezone.now()
            self.save()
