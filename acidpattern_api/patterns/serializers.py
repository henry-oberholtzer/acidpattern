from rest_framework import serializers
from patterns.models import Pattern, Settings, Section
from drf_writable_nested import WritableNestedModelSerializer

class SettingsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Settings
    exclude = ['pattern']

class SectionSerializer(WritableNestedModelSerializer):
  class Meta:
    model = Section
    exclude = ['pattern']

class PatternSerializer(WritableNestedModelSerializer):
  settings = SettingsSerializer()
  sections = SectionSerializer(many=True)
  
  class Meta:
    model = Pattern
    fields = ['id', 'name', 'date', 'settings', 'sections']
