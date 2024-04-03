from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, MaxLengthValidator

# class PatternManager(models.Manager):
  
#   def create(self, 
#             name,
#             tempo=130,
#             waveform="saw",
#             tuning=0,
#             cut_off_freq=63,
#             resonance=63,
#             env_mod=63,
#             decay=63,
#             accent=63,):
#     pattern = Pattern.objects.create(name=name)
#     pattern.save()
#     settings = Settings.objects.create(
#       pattern=pattern,
#       tempo=tempo,
#       waveform=waveform,
#       tuning=tuning,
#       cut_off_freq=cut_off_freq,
#       resonance=resonance,
#       env_mod=env_mod,
#       decay=decay,
#       accent=accent,
#     )
#     settings.save()
#     return pattern

class Pattern(models.Model):
  name = models.CharField(validators=[MaxLengthValidator(30)], max_length=30)
  date = models.DateTimeField(auto_now_add=True)

class Settings(models.Model):
  class Waveform(models.TextChoices):
    SAW = "saw",
    SQUARE = "square",
  
  pattern = models.OneToOneField(
    Pattern,
    on_delete=models.CASCADE,
    primary_key=True,
  )
  
  tempo = models.PositiveSmallIntegerField(
    validators=[
      MinValueValidator(40),
      MaxValueValidator(300),
    ],
    default=130,
  )
  waveform = models.CharField(
    choices=Waveform,
    default=Waveform.SAW,
    max_length=6
  )
  tuning = models.SmallIntegerField(
    validators=[
      MinValueValidator(-500),
      MaxValueValidator(500),
    ],
    default=0
  )
  cut_off_freq = models.PositiveSmallIntegerField(
    validators=[MaxValueValidator(127)],
    default=63
  )
  resonance = models.PositiveSmallIntegerField(
    validators=[MaxValueValidator(127)],
    default=63
  )
  env_mod = models.PositiveSmallIntegerField(
    validators=[MaxValueValidator(127)],
    default=63
  )
  decay = models.PositiveSmallIntegerField(
    validators=[MaxValueValidator(127)],
    default=63
  )
  accent = models.PositiveSmallIntegerField(
    validators=[MaxValueValidator(127)],
    default=63
  )
  
  def __str__(self):
    return "'%s' settings" % (self.pattern.name)


class Section(models.Model):
  
  class Name(models.TextChoices):
    A = "A"
    B = "B"
  
  name = models.CharField(choices=Name, max_length=1)
  pattern = models.ForeignKey(Pattern, on_delete=models.CASCADE)

# class PitchMode(models.Model):
  
#   class Octave(models.IntegerChoices):
#     DOWN = -12,
#     NONE = 0,
#     UP = 12,
    
#   section = models.ForeignKey(Pattern, on_delete=models.CASCADE)
#   index = models.PositiveSmallIntegerField(
#     validators=[MaxValueValidator(15)],
#     default=0)
  
#   accent = models.BooleanField(default=False)
#   slide = models.BooleanField(default=False)
#   pitch = models.PositiveSmallIntegerField(
#     validators=[
#       MaxValueValidator(48),
#       MinValueValidator(36)
#     ],
#     default=36)
#   octave = models.SmallIntegerField(
#     choices=Octave.choices,
#     default=Octave.NONE
#   )
#   class Meta():
#     ordering=['index']

# class TimeMode(models.Model):
#   section = models.ForeignKey(Pattern, on_delete=models.CASCADE)
#   index = models.PositiveSmallIntegerField(validators=[MaxValueValidator(15)], default=0)
  
#   class Time(models.IntegerChoices):
#     NOTE = 0,
#     TIED = 1,
#     REST = 2
  
#   time = models.SmallIntegerField(
#     choices=Time.choices
#   )

#   class Meta():
#     ordering=['index']
