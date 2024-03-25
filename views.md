# API / Page View Structure

## API Structure

```
Home (/)
├─ Pattern (/patterns/)
│  ├─ View All (/patterns/all)
│  ├─ Search (/patterns/search?)
│  ├─ Program [auth](patterns/create)
│  ├─ Pattern Details (/patterns/:id)
│  │  ├─ Edit [auth] (patterns/:id/edit)
│  │  ├─ Remix [auth] (patterns/:id/remix)
│  │  ├─ Get Midi [auth] (patterns/:id/midi)
├─ Users (/users) [auth]
│  ├─ Profile (/users/:id)
```

## Page Structure

Layout
- Menu
- 303 Controls / Synth
- Account Buttons

Home
- Basic splash about the use of the site
- Recent patterns posted
Browse
- Shows the most recent patterns posted.
- Filter options for patterns
- Transpose settings for patterns
Program
- Input in chart/grid style
- controls for synth sound
- possible automation for parameters over the pattern's length?
Pattern Details
- Shows the pattern displayed as midi notes
- Shows information about internvals present in the pattern
- Pattern name / description
- Pattern author / user
- Pattern suggested BPM / suggest key
- Suggested sound parameters. 
