from rest_framework import serializers
from patterns.models import Pattern, Settings

class SettingsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Settings
    exclude = ['pattern']

class PatternSerializer(serializers.ModelSerializer):
  settings = SettingsSerializer()
  
  class Meta:
    model = Pattern
    fields = ['id', 'name', 'date', 'settings']
    
  def create(self, validated_data):
    settings_data = validated_data.pop('settings')
    pattern = Pattern.objects.create(**validated_data)
    settings = Settings.objects.create(pattern=pattern, **settings_data)
    return pattern
