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
  - Cover letters for internships

4-16-24
  - Whiteboarding practice
  - Continuing Oauth2.0 set up, sort of went in circles a bit.

4-17-24
  - Whiteboarding practice.
  - Auth is good to go!
  - Tests are back to passing!
  - Coverage is up to 96%, which is the best I can reasonably get at the moment.

4-18-24
  - Whiteboarding practice
  - Set up user profile & migrate db
  - Changes to user profile view.
  - Create react front end files
  - Updates to README.md
  - Link Django settings to .env
  - Build skeleton user profile component
  - Build skeleton login
  - Build skeleton pattern form component
  - Build skeleton pattern view

4-22-24
  - Begin 303 Layout & design
  - Create switches, create keyboard
  - Basic state management
  

4-23-24
  - Prep for interview
  - Work on building out TB303 UI
  - Switching to useContext for state of pattern
  - Add sections "A" and "B"
  - Create knob component
  - Add logos to 303

4-29-24
  - Fix the knobs to prevent creating so many classes, causing re-rendering in chrome
  - Connect all potentiometers to control correct parts of the 303
  - Switch the main page just the 303
  - Add pattern view widgets

4-30-24
  - Restyle login view
  - Handle log in errors
  - Restyle register view
  - Handle errors in register view
  - Set logout if token expires.

5-1-24
  - Finishing pattern post mode
    - Add pattern name field (Above 303)
    - Add "post" button
    - Add auth check to post button
  - Add clear pattern modal

5-2-24
  - Pattern clear button functionality
  - Pattern browse view
  - Resonance connected
  - Pattern play mode

To Do:
  - BUG: Sequencer continues playing when navigating to a new page.
  
Critical Features To Add:

  - Pattern List
    - Move to main page?
    - Tiles
    - Pagination
    - Queryable
    - Playable on page
    - List of patterns next to 303?
  - Pattern Write
    - Programming Tutorial
    - Transpose
    - Sequencer can switch sections smoothly
    - 
  - Pattern Details
    - Pull it into synthesizer for playing.
  - Users
    - Public Profile
    - Profile Photos
  - User Profile List
    - User
  - My Patterns
  - Active index indicator on pattern info

- Voice303
  - Adjust sound to be more inline with the 303
  - Slide functionality
  - Transpose functionality
  - Fix 303 sound with Web Audio Modules (?)

  - Fix range thumb on chrome.
  - Pattern to MIDI

Later Features:
  - Key estimation for pattern / key select
  - Suggest similar patterns based on keys / accents / pitches
  - Customizable color for your 303, saved to user profile using styled components theme.
  - Add user date joined if needed.
  - Add color option to patterns.

  - Test user profile
  - Test user login & user creating a pattern
  - Assign that method to an API endpoint (/midi)
    - Add admin permissions to users for frontend.
  - Write method to generate MIDI from a pattern.
