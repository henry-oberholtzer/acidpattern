from rest_framework import serializers
from patterns.models import Pattern

class PatternSerializer(serializers.ModelSerializer):
  class Meta:
    model = Pattern
    fields = ['id', 'name', 'date']

# class SettingsSerializer(serializers.ModelSerializer):
#   class Meta:
#     model = Settings
#     fields = 
