'''
Created on Mar 3, 2017

@author: pochangl
'''
from rest_framework import permissions


class OwnerOnlyPermission(permissions.BasePermission):
    """
        Object-level permission to only allow owners of an object.
        Assumes the model instance has an `owner` attribute.
    """

    def has_object_permission(self, request, view, obj):
        # Instance must have an attribute named `owner`.
        return obj.owner == request.user


class AnonymousOnlyPermission(permissions.BasePermission):
    """
        Permission that disable Authenticated user from accessing the resource
        designed primary for registration request
    """
    def has_permission(self, request, *args, **kwargs):
        return request.user.is_anonymous()
