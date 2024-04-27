class Voice303 {
  context: AudioContext
  osc: OscillatorNode;
  filter: BiquadFilterNode;
  filterEnvelope: Fre;
  ampEnvelope: ;
  volume: GainNode;
  saw = "sawtooth"
  square = "square"

  pitches = new Map([
    [24, 32.70320],
    [25, 34.64783],
    [26, 36.70810],
    [27, 38.89087],
    [28, 41.20344],
    [29, 43.65353],
    [30, 46.24930],
    [31, 48.99943],
    [32, 51.91309],
    [33, 55.00000],
    [34, 58.27047],
    [35, 61.73541],
    [36, 65.40639],
    [37, 69.29566],
    [38, 73.41619],
    [39, 77.78175],
    [40, 82.40689],
    [41, 87.30706],
    [42, 92.49861],
    [43, 97.99886],
    [44, 103.8262],
    [45, 110.0000],
    [46, 116.5409],
    [47, 123.4708],
    [48, 130.8128],    
  ])


  constructor(settings: Settings) {
    this.context = new AudioContext()
    this.osc = new OscillatorNode(this.context, {
      frequency: 440,
      type: "sawtooth",
    });
    this.osc.type = "square"
    this.filter = new BiquadFilterNode(this.context, {
      type: "lowpass",
      frequency: 18000,
    })
    this.filterEnvelope 
    this.ampEnvelope = new Tone.AmplitudeEnvelope()
    this.volume = new Tone.Volume().connect(this.filter)
  }

  adjustTuning(value: number) {

  }

  adjustCutoff(value: number) {

  }

  adjustResonance(value: number) {

  }


  adjustWaveform(waveform: "saw" | "square") {
    if (waveform === "saw") {
      this.osc.type = this.saw as OscillatorType
    } else {
      this.osc.type = this.square as OscillatorType
    }
  }

  adjustEnv(value: number) {

  }

  adjustDecay(value: number) {

  }

  adjustAccent(value: number) {

  }

  playPattern(timeMode: Time[], pitchMode: Pitch[]) {
  }

  attack(pitch: number) {
    this.osc.frequency.setValueAtTime(this.pitches.get(pitch), this.context.currentTime) 
    this.ampEnvelope.triggerAttack()
    this.filterEnvelope.triggerAttack()
    this.osc.start()
  }

  release() {
    this.ampEnvelope.triggerRelease(time);
		this.filterEnvelope.triggerRelease(time);
		this.osc.stop(time + this.toSeconds(this.envelope.release));
  }
}

export { Voice303 }
