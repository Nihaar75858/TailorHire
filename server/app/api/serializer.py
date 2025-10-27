from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        """Handle password hashing and skip M2M direct assignment"""
        password = validated_data.pop('password', None)
        groups = validated_data.pop('groups', [])
        user_permissions = validated_data.pop('user_permissions', [])
        role = validated_data.pop('role', None)

        user = CustomUser(**validated_data)

        if password:
            user.password = make_password(password)
        user.save()

        # Handle ManyToManys after save
        if groups:
            user.groups.set(groups)
        if user_permissions:
            user.user_permissions.set(user_permissions)

        # Role (JSONField) can still be assigned
        if role is not None:
            user.role = role
            user.save()

        return user

    def update(self, instance, validated_data):
        """Allow partial updates and handle M2Ms correctly"""
        password = validated_data.pop('password', None)
        groups = validated_data.pop('groups', [])
        user_permissions = validated_data.pop('user_permissions', [])
        role = validated_data.pop('role', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.password = make_password(password)
        instance.save()

        if groups:
            instance.groups.set(groups)
        if user_permissions:
            instance.user_permissions.set(user_permissions)
        if role is not None:
            instance.role = role
            instance.save()

        return instance
