from django.db import models

class Pattern(models.Model):
  name = models.CharField(max_length=50)
  date = models.DateTimeField(auto_now_add=True)

class Settings(models.Model):
  
  class Waveform(models.IntegerChoices):
    SAW = 0,
    SQUARE = 1,
  
  pattern = models.ForeignKey(Pattern, on_delete=models.CASCADE)
  
  tempo = models.PositiveSmallIntegerField(
    min_value=40,
    max_value=300,
    default=130
  )
  waveform = models.SmallIntegerField(
    choices=Waveform,
    default=Waveform.SAW
  )
  tuning = models.SmallIntegerField(
    min_value=-500,
    max_value=500,
    default=0
  )
  cut_off_freq = models.PositiveSmallIntegerField(
    max_value=127,
    default=63
  )
  resonance = models.PositiveSmallIntegerField(max_value=127, default=63)
  env_mod = models.PositiveSmallIntegerField(max_value=127, default=63)
  decay = models.PositiveSmallIntegerField(max_value=127, default=63)
  accent = models.PositiveSmallIntegerField(max_value=127, default=63)

class Section(models.Model):
  
  pattern = models.ForeignKey(Pattern, on_delete=models.CASCADE)

class PitchMode(models.Model):
  
  class Octave(models.IntegerChoices):
    DOWN = -12,
    NONE = 0,
    UP = 12,
    
  section = models.ForeignKey(Pattern, on_delete=models.CASCADE)
  index = models.PositiveSmallIntegerField(max_value=16, default=0)
  
  accent = models.BooleanField(default=False)
  slide = models.BooleanField(default=False)
  pitch = models.PositiveSmallIntegerField(min_value=36, max_value=48, default=36)
  octave = models.SmallIntegerField(
    choices=Octave.choices,
    default=Octave.NONE
  )
  class Meta():
    ordering=['index']

class TimeMode(models.Model):
  section = models.ForeignKey(Pattern, on_delete=models.CASCADE)
  index = models.PositiveSmallIntegerField(max_value=16, default=0)
  
  class Time(models.IntegerChoices):
    NOTE = 0,
    TIED = 1,
    REST = 2
  
  time = models.SmallIntegerField(
    choices=Time.choices
  )

  class Meta():
    ordering=['index']
