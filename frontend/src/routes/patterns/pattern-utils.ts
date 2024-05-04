const newPattern = () => {
  const pattern: Pattern = {
    name: "",
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
        time_mode: [],
        pitch_mode: []
      },
      {
        name: "B",
        time_mode: [],
        pitch_mode: [],
      },
    ]
  }
  return pattern
}

export { newPattern }
