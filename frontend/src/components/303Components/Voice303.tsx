import * as Tone from "tone";

class Voice303 {
  synth: Tone.Synth;


  constructor() {
    this.synth = new Tone.Synth().toDestination();
  }

  attack(pitch: number) {
    const frequency = Tone.Frequency(pitch, "midi").toNote()
    this.synth.triggerAttack(frequency)
  }

  release() {
    this.synth.triggerRelease()
  }
}

export { Voice303 }
