from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, MaxLengthValidator
from users.models import User

class Pattern(models.Model):
  name = models.CharField(validators=[MaxLengthValidator(30)], max_length=30)
  date = models.DateTimeField(auto_now_add=True)
  author = models.ForeignKey('users.User', related_name='patterns', on_delete=models.CASCADE)

  def save(self, *args, **kwargs):
    """
    Will generate the midi file and image for the pattern on save.
    """
    super().save(*args, **kwargs)

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
  pattern = models.ForeignKey(Pattern, related_name='sections', on_delete=models.CASCADE)

class Pitch(models.Model):
  
  class Octave(models.IntegerChoices):
    DOWN = -12,
    NONE = 0,
    UP = 12,
    
  section = models.ForeignKey(Section, related_name='pitch_mode', on_delete=models.CASCADE)
  
  index = models.PositiveSmallIntegerField(
    validators=[MaxValueValidator(15)],
    default=0)
  
  accent = models.BooleanField(default=False)
  slide = models.BooleanField(default=False)
  pitch = models.PositiveSmallIntegerField(
    validators=[
      MaxValueValidator(48),
      MinValueValidator(36)
    ],
    default=36)
  octave = models.SmallIntegerField(
    choices=Octave.choices,
    default=Octave.NONE
  )
  class Meta():
    ordering=['index']

class Time(models.Model):
  section = models.ForeignKey(Section, related_name='time_mode', on_delete=models.CASCADE)
  index = models.PositiveSmallIntegerField(validators=[MaxValueValidator(15)], default=0)
  
  class Timing(models.IntegerChoices):
    REST = 0,
    NOTE = 1,
    TIED = 2,
  
  timing = models.SmallIntegerField(
    choices=Timing.choices
  )

  class Meta():
    ordering=['index']
