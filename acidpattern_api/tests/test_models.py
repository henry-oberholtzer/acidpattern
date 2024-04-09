from django.test import TestCase
from django.core.exceptions import ValidationError
from patterns.models import Pattern, Settings, Section

class TestPatternModel(TestCase):
  def setUp(self):
    Pattern.objects.create(name="First Pattern")
  def test_pattern_get_name(self):
    pattern = Pattern.objects.get(name="First Pattern")
    self.assertEqual(pattern.name, "First Pattern")
  def test_pattern_name_too_long(self):
    long_name = "this name is going to be way too long to be a title for a pattern on my website"
    self.assertTrue(len(long_name) > 30)
    pattern = Pattern.objects.create(name=long_name)
    self.assertRaises(ValidationError, pattern.full_clean)

class TestSetttingsModel(TestCase):
  def setUp(self):
    pattern = Pattern.objects.create(name="You, Me, Us Them, Underground Sound")
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
    
class TestSection(TestCase):
  def setUp(self):
    pattern = Pattern.objects.create(name="One Night In Hackney")
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
