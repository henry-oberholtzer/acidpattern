from django.test import TestCase
from django.core.exceptions import ValidationError
from patterns.models import Pattern, Settings, Section, Pitch, Time
from django.contrib.auth import get_user_model

class TestPatternModel(TestCase):
  def setUp(self):
    self.username = "test"
    self.email = "test@email.net"
    self.password = "my_test_password"
    self.user = get_user_model().objects.create(
      username=self.username,
      email=self.email,
      password=self.password)
  
  def test_pattern_get_name(self):
    Pattern.objects.create(name="First Pattern", author_id=1)
    pattern = Pattern.objects.get(name="First Pattern")
    self.assertEqual(pattern.name, "First Pattern")
  def test_pattern_name_too_long(self):
    long_name = "this name is going to be way too long to be a title for a pattern on my website"
    self.assertTrue(len(long_name) > 30)
    pattern = Pattern.objects.create(name=long_name, author_id=1)
    self.assertRaises(ValidationError, pattern.full_clean)
  def test_create_full_settings_object(self):
    pattern = Pattern.objects.create(name="One Night In Hackney", author_id=1)
    settings = Settings.objects.create(pattern=pattern)
    a = Section.objects.create(name="A", pattern=pattern)
    b = Section.objects.create(name="B", pattern=pattern)
    for i in range(0, 16):
      Time.objects.create(
      section=a,
      index=i,
      time=1)
    for i in range(0, 16):
      Pitch.objects.create(
      section=a,
      index=i,
      accent=False,
      pitch=48,
      octave=-12)
    for i in range(0, 16):
      Time.objects.create(
      section=b,
      index=i,
      time=1)
    for i in range(0, 16):
      Pitch.objects.create(
      section=b,
      index=i,
      accent=False,
      pitch=48,
      octave=-12)
    self.assertEqual(len(Pitch.objects.all()), 32)
    self.assertEqual(len(Time.objects.all()), 32)
    self.assertEqual(len(Section.objects.all()), 2)
    self.assertEqual(len(Time.objects.filter(section=a)), 16)
    self.assertEqual(len(Pitch.objects.filter(section=b)), 16)
  def test_delete_full_settings_object(self):
    pattern = Pattern.objects.create(name="One Night In Hackney", author_id=1)
    settings = Settings.objects.create(pattern=pattern)
    a = Section.objects.create(name="A", pattern=pattern)
    b = Section.objects.create(name="B", pattern=pattern)
    for i in range(0, 16):
      Time.objects.create(
      section=a,
      index=i,
      time=1)
    for i in range(0, 16):
      Pitch.objects.create(
      section=a,
      index=i,
      accent=False,
      pitch=48,
      octave=-12)
    for i in range(0, 16):
      Time.objects.create(
      section=b,
      index=i,
      time=1)
    for i in range(0, 16):
      Pitch.objects.create(
      section=b,
      index=i,
      accent=False,
      pitch=48,
      octave=-12)
    pattern.delete()
    self.assertEqual(len(Pattern.objects.all()), 0)
    self.assertEqual(len(Section.objects.all()), 0)
    self.assertEqual(len(Pitch.objects.all()), 0)
    self.assertEqual(len(Time.objects.all()), 0)


class TestSettingsModel(TestCase):
  def setUp(self):
    self.username = "test"
    self.email = "test@email.net"
    self.password = "my_test_password"
    self.user = get_user_model().objects.create(
      username=self.username,
      email=self.email,
      password=self.password)
    pattern = Pattern.objects.create(name="You, Me, Us Them, Underground Sound", author_id=1)
    Settings.objects.create(pattern=pattern)
  def test_settings_properties(self):
    settings = Settings.objects.get()
    self.assertEqual(settings.tempo, 130)
    self.assertEqual(settings.waveform, "saw")
    self.assertEqual(settings.tuning, 0)
    self.assertEqual(settings.cut_off_freq, 63)
    self.assertEqual(settings.resonance, 63)
    self.assertEqual(settings.env_mod, 63)
    self.assertEqual(settings.decay, 63)
    self.assertEqual(settings.accent, 63)
  def test_settings_through_pattern(self):
    settings = Pattern.objects.get(name="You, Me, Us Them, Underground Sound").settings
    self.assertEqual(settings.tempo, 130)
  def test_adjust_properties(self):
    settings = Settings.objects.get()
    settings.tempo = 150
    self.assertEqual(settings.tempo, 150)
  def test_settings_string(self):
    settings = Pattern.objects.get(name="You, Me, Us Them, Underground Sound").settings
    self.assertEqual(str(settings), "'You, Me, Us Them, Underground Sound' settings")
    
class TestSectionModel(TestCase):
  def setUp(self):
    self.username = "test"
    self.email = "test@email.net"
    self.password = "my_test_password"
    self.user = get_user_model().objects.create(
      username=self.username,
      email=self.email,
      password=self.password)
    pattern = Pattern.objects.create(name="One Night In Hackney", author_id=1)
    Settings.objects.create(pattern=pattern)
    Section.objects.create(name="A", pattern=pattern)
    Section.objects.create(name="B", pattern=pattern)
  def test_section_get_by_name(self):
    section = Section.objects.get(name="A")
    self.assertEqual(section.name, "A")
  def test_section_get_by_pattern(self):
    pattern = Pattern.objects.get(pk=1)
    sections = Section.objects.filter(pattern=pattern)
    self.assertEqual(len(sections), 2)

class TestPitchModel(TestCase):
  def setUp(self):
    self.username = "test"
    self.email = "test@email.net"
    self.password = "my_test_password"
    self.user = get_user_model().objects.create(
      username=self.username,
      email=self.email,
      password=self.password)
    pattern = Pattern.objects.create(name="One Night In Hackney", author_id=1)
    Settings.objects.create(pattern=pattern)
    Section.objects.create(name="A", pattern=pattern)
    Section.objects.create(name="B", pattern=pattern)
  def test_create(self):
    section = Section.objects.get(pk=1)
    pitch = Pitch.objects.create(
      section=section,
      index=0,
      accent=False,
      pitch=48,
      octave=-12)
    pitch.save()
    self.assertEqual(Pitch.objects.get(section=section), pitch)
  def test_create_batch(self):
    section = Section.objects.get(pk=1)
    for i in range(0, 16):
      Pitch.objects.create(
      section=section,
      index=i,
      accent=False,
      pitch=48,
      octave=-12)
    self.assertEqual(len(Pitch.objects.filter(section=section)), 16)

class TestTimeModel(TestCase):
  def setUp(self):
    self.username = "test"
    self.email = "test@email.net"
    self.password = "my_test_password"
    self.user = get_user_model().objects.create(
      username=self.username,
      email=self.email,
      password=self.password)
    pattern = Pattern.objects.create(name="One Night In Hackney", author_id=1)
    Settings.objects.create(pattern=pattern)
    Section.objects.create(name="A", pattern=pattern)
    Section.objects.create(name="B", pattern=pattern)
  def test_create_time(self):
    section = Section.objects.get(name="B")
    time = Time.objects.create(
      section=section,
      index=0,
      time=1
    )
    self.assertEqual(Time.objects.get(section=section), time)
  def test_create_batch(self):
    section = Section.objects.get(pk=1)
    for i in range(0, 16):
      Time.objects.create(
      section=section,
      index=i,
      time=1)
    self.assertEqual(len(Time.objects.filter(section=section)), 16)
