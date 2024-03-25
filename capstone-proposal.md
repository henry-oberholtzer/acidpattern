#  acidpattern.com

# Features

## Minimum Viable Product
- Log in and log out.
- Post musical patterns that will be stored in a database.
- Patterns are stored without fixed pitch data, allowing users to set to either hear the pattern in the key it was written in or transposed to a key of their preference.

- Edit and delete the patterns
- Hear any pattern play back on browser with WebAudioAPI.
- Adjust WebAudioAPI synth parameters on the fly.
- View and listen to patterns from other users.
- Download patterns as midi files.
- Responsive user interface.
- Deployed as live code.

## Stretch Goals
- Effects can be enabled for the 303, a kick drum can be enabled for the 303. Playback tempo can be adjusted.
- Ability to add attribution if the pattern is based on an existing track.
- Pattern length can be polyrhytmic?
- Page for programming guides for different clones / downloads for different formats of clones.
- Users can set profile pictures, have a profile page that lists all their patterns.
- Patterns can be "remixed" from other users, with a chain of attribution stored. (e.g. Tumblr reblogs/twitter reposts.)
- Users can hear pattern playback without WebAudioAPI (pre-rendered server-side)
- Users can store their patterns in "303s" in each are four "Banks" with spaces for 16 patterns each (mirroring the original TB-303 data structure)

# Technology Stack
- Django / Flask (backend / MVC control)
- React (frontend? pre-rendered?)
- WebAudioAPI (audio playback and generation on clientside)
- Python scripts (for generating MIDI files, etc)
- SQLite or PostgresSQL database.

# Other Technologies
- React Spring?
- Preact if i'm not using a TON of react features?
