const newPattern = () => {
  const pattern: Pattern = {
    name: "New Pattern",
    settings: {
      waveform: "saw",
      tempo: 130,
      tuning: 0,
      cut_off_freq: 63,
      resonance: 63,
      env_mod: 63,
      decay: 63,
      accent: 63,
    },
    sections: [
      {
        name: "A",
        time_mode: new Array(16),
        pitch_mode: new Array(16)
      },
      {
        name: "B",
        time_mode: new Array(16),
        pitch_mode: new Array(16)
      },
    ]
  }
  return pattern
}

export { newPattern }
