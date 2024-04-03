from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, MaxLengthValidator

class Pattern(models.Model):
  name = models.CharField(validators=[MaxLengthValidator(30)], max_length=30)
  date = models.DateTimeField(auto_now_add=True)

# class Settings(models.Model):
  
#   class Waveform(models.IntegerChoices):
#     SAW = 0,
#     SQUARE = 1,
  
#   pattern = models.OneToOneField(
#     Pattern,
#     on_delete=models.CASCADE,
#     primary_key=True,
#   )
  
#   tempo = models.PositiveSmallIntegerField(
#     validators=[
#       MinValueValidator(40),
#       MaxValueValidator(300),
#     ],
#     default=130,
#   )
#   waveform = models.SmallIntegerField(
#     choices=Waveform,
#     default=Waveform.SAW,
#   )
#   tuning = models.SmallIntegerField(
#     validators=[
#       MinValueValidator(-500),
#       MaxValueValidator(500),
#     ],
#     default=0
#   )
#   cut_off_freq = models.PositiveSmallIntegerField(
#     validators=[MaxValueValidator(127)],
#     default=63
#   )
#   resonance = models.PositiveSmallIntegerField(
#     validators=[MaxValueValidator(127)],
#     default=63
#   )
#   env_mod = models.PositiveSmallIntegerField(
#     validators=[MaxValueValidator(127)],
#     default=63
#   )
#   decay = models.PositiveSmallIntegerField(
#     validators=[MaxValueValidator(127)],
#     default=63
#   )
#   accent = models.PositiveSmallIntegerField(
#     validators=[MaxValueValidator(127)],
#     default=63
#   )

# class Section(models.Model):
  
#   class Name(models.TextChoices):
#     A = "A"
#     B = "B"
  
#   name = models.CharField(choices=Name, max_length=1)
#   pattern = models.ForeignKey(Pattern, on_delete=models.CASCADE)

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
