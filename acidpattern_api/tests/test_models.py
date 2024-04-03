from django.test import TestCase
from django.core.exceptions import ValidationError
from patterns.models import Pattern

class PatternTestCase(TestCase):
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
      

