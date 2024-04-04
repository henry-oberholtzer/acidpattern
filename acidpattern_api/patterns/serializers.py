from rest_framework import serializers
from patterns.models import Pattern, Settings
from drf_writable_nested import WritableNestedModelSerializer

class SettingsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Settings
    exclude = ['pattern']

class PatternSerializer(WritableNestedModelSerializer):
  settings = SettingsSerializer()
  
  class Meta:
    model = Pattern
    fields = ['id', 'name', 'date', 'settings']
