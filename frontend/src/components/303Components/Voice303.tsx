import * as Tone from "tone";

class Voice303 {
  synth: Tone.Synth;


  constructor() {
    this.synth = new Tone.Synth().toDestination();
  }

  play(pitch: number) {
    const frequency = Tone.Frequency(pitch, "midi").toNote()
    this.synth.triggerAttackRelease(frequency, "8n")
  }
}

export { Voice303 }
