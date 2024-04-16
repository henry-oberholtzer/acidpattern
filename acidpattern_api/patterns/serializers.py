from rest_framework import serializers
from patterns.models import Pattern, Settings, Section, Pitch, Time
from drf_writable_nested import WritableNestedModelSerializer

class PitchSerializer(serializers.ModelSerializer):
  class Meta:
    model = Pitch
    exclude = ['section']

class TimeSerializer(serializers.ModelSerializer):
  class Meta:
    model = Time
    exclude = ['section']
    
class SectionSerializer(WritableNestedModelSerializer):
  pitch_mode = PitchSerializer(many=True, max_length=16)
  time_mode = TimeSerializer(many=True, max_length=16)
  
  class Meta:
    model = Section
    exclude = ['pattern']

class SettingsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Settings
    exclude = ['pattern']


class PatternSerializer(WritableNestedModelSerializer):
  settings = SettingsSerializer()
  sections = SectionSerializer(many=True, max_length=2)
  author = serializers.ReadOnlyField(source='author.username')
  
  class Meta:
    model = Pattern
    fields = ['id', 'name', 'date', 'settings', 'sections', 'author']


