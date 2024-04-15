
# User
  - Users should be able to log in and log out.
  - User should be able to create a pattern.
  - User should be able to edit a pattern.
  - User should be able to delete a pattern.
  - User should be able to adjust the settings of a pattern.
  - User should be able to add a second section.
  - Section A can be copied to Section B and vice versa by the user.

# Pattern Model
  - A pattern contains a series of settings.
  - Name
  - Author
  - Date Created
  - Date Edited
  - Remixed from?
  - **Settings**
    - tempo (40 to 300, default 130)
    - tuning (default 0, down to -120, +-500 cents)
    - cut_off_freq (default 63, min 0 max 127)
    - resonance (default 63, min 0 max 127)
    - env_mod (default 63, min 0 max 127)
    - decay (default 63, min 0 max 127)
    - accent (default 63, min 0, max 127)
    - waveform (saw or square)
  - **Sections**
    - A pattern holds one section, A by default
    - A second section can be added.
    - A section can be set to sixteenths or triplets.
    - If a section is set to sixteenths, it will hold up to 16 steps.
    - If a section is set to triplets, it will hold up to 15 steps.
    - If a section is changed to triplets from sixteenths, it will remove any steps over 15
  - **Steps**
    - A step contains the following data.
    - If the note is active or a rest.
    - If the note is tied from the previous.
    - The base pitch of the note (from C2, midi36 to C3, midi48)
    - If the octave is transposed up (+12) or down (-12) or left at center (0).
    - If an accent is applied.
    - If the note slides into the next note.
  **Methods**
    - View
      - Returns a post viewable version of the pattern.
    - Convert to MIDI
      - Takes the pattern and turns it into a valid midi file for playback
    - Create SVG
      - Takes the pattern and turns it into an SVG image for printing
    - Create .WAV
      - Takes the pattern and renders it as a .wav file.

# Keyboard input & controls

- Optional, takes over when user is in pattern write mode.

a - C
  w - C#
s - D
  e - D#
d - E
f - F
  t - F#
g - G
  y - G#
h - A
  u - A#
j - B
k - C

space - start/stop

back - backspace
enter - write/next

"<" - sixteenth
">" - "tie"
"?" - rest

shift - alternate time & pitch mode
