4-2-24 - Write out all user stories, begin building API.

4-3-24
  - Wrote and tested Pattern model
  - Create API view for pattern.
  - Test Pattern Serializer
  - Tested Settings
  - Created nested relation between pattern & settings.

4-5-24
  - Create & test writable nested serializer for settings.
  - Write & test pattern detail view.
  - Add sections
  - Add section tests

4-8-24
  - Add Time and Pitch to section
  - Write tests for pitch and time models.
  - Expand pattern model tests.
  - Test pattern views with pitch and time.
  - Limit Pitch and Time length to 16 in serializer.
  - Limit Section length to 2 in serializer.

4-15-24
  - Oauth2.0 set up

4-16-24
  - Whiteboarding practice
  - Continuing Oauth2.0 set up

To Do:
- Object level permissions
  https://www.django-rest-framework.org/api-guide/permissions/#object-level-permissions
  - Get authentication working in pattern tests
  - Implement OAuth2.0 with ownership for users https://github.com/jazzband/django-oauth-toolkit
  - Add user
    - Add admin permissions
  - Add user profile.
    - Date joined
    - Patterns created
    - Profile pic
  - User views
    - Add pagination
  - Add user ownership to patterns.
    https://docs.djangoproject.com/en/5.0/topics/auth/customizing/#django.contrib.auth.get_user_model
  - Write method to generate MIDI from a pattern.
  - Assign that method to an API endpoint (/midi)
    - 
  - Add max length to serializer sections and pitch and time.
  - Add color or image option to patterns.
  - Add profile picture to user.
    - https://docs.djangoproject.com/en/5.0/topics/http/file-uploads/
    - Create folder to store uploaded files, sorted by user

  - Tokens in API calls on React?

  - How to limit it to two with two names?


  - Model validation
