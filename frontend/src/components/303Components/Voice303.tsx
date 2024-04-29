class Voice303 {
	
	private context: AudioContext;
	private osc: OscillatorNode;
	private filterOne: BiquadFilterNode;
  private filterTwo: BiquadFilterNode;
	private ampEnvelope: GainNode;
	private volumeNode: GainNode;
	saw = 'sawtooth';
	square = 'square';
	
  // private filterMin = 140;
  // private filterMax = 1500;
	
	tempo: number;
	cutoffFreq: number;
	resonance: number;
	decay: number;
	accent: number;
	envMod: number;
	tuning: number;
	waveform: "square" | "saw";
	volume: number;

	midiToFrequency = (note: number) => 440 * 2 ** ((note - 69) / 12);

	centToFrequency(value: number, f1: number) {
    return f1 * 2 ** (value / 1200) 
  }

  ccToCutoff(value: number) {
    return 140 + value * 10.625
  }


	constructor(settings: Settings) {
		this.tempo = settings.tempo;
		this.tuning = settings.tuning;
		this.cutoffFreq = this.ccToCutoff(settings.cut_off_freq);
		this.resonance = settings.resonance;
		this.envMod = settings.env_mod;
		this.decay = settings.decay;
		this.accent = settings.accent;
		this.waveform = settings.waveform;
		this.volume = 63

		this.context = new AudioContext();
		this.osc = new OscillatorNode(this.context, {
			frequency: 440,
			type: 'sawtooth',
		});
		this.osc.type = 'square';
		this.filterOne = new BiquadFilterNode(this.context, {
			type: 'lowpass',
			frequency: 400,
      Q: 0.0,
		});
    this.filterTwo = new BiquadFilterNode(this.context, {
			type: 'lowpass',
			frequency: 400,
      Q: 0.0,
		});
		this.ampEnvelope = new GainNode(this.context, { gain: 0 });
		this.volumeNode = new GainNode(this.context, { gain: 1});
		this.osc
			.connect(this.filterOne)
      .connect(this.filterTwo)
			.connect(this.ampEnvelope)
			.connect(this.volumeNode)
			.connect(this.context.destination);
    this.osc.start();
	}

	setTempo(value: number) {
    this.tempo = value;
	}

  setCutoff(value: number) {
		this.cutoffFreq = this.ccToCutoff(value);
  }

	setTuning(value: number) {
		this.tuning = value
	}

	setResonance(value: number) {
		this.resonance = 16 * (value/127)
	}

	setEnvMod(value: number) {
		this.envMod = value
	}

	setDecay(value: number) {
		this.decay = value
	}

	setAccent(value: number) {
		this.accent = value
	}

	setVolume(value: number) {
		this.volume = (value/127)
		const t = this.context.currentTime
		this.volumeNode.gain.setValueAtTime((value/127), t)
	}

	

	adjustWaveform(waveform: 'saw' | 'square') {
		if (waveform === 'saw') {
      this.osc.type = this.saw as OscillatorType;
      console.log(this.osc.type)
		} else {
			this.osc.type = this.square as OscillatorType;
		}
	}

	// playPattern(timeMode: Time[], pitchMode: Pitch[]) {
  //   while(this.run === true) {
  //     console.log()
  //   }
	// }

	triggerFilterEnvelope(time: number) {
		const attackTime = 0.015
		const decayTime = .2 + (2.6 * (this.decay/127))
		// Attack
		this.filterOne.frequency.linearRampToValueAtTime(this.cutoffFreq, time + attackTime)
    this.filterTwo.frequency.linearRampToValueAtTime(this.cutoffFreq, time  + attackTime)
		// Decay
		this.filterOne.frequency.exponentialRampToValueAtTime(this.cutoffFreq, time + attackTime + decayTime)
    this.filterTwo.frequency.exponentialRampToValueAtTime(this.cutoffFreq, time + attackTime + decayTime)

	}

	triggerVolumeEnvelope(time: number) {
		const attackTime = 0.015
		const decayTime = 4
		this.ampEnvelope.gain.cancelScheduledValues(time)
		this.ampEnvelope.gain.setTargetAtTime(0.6, time, attackTime)
		this.ampEnvelope.gain.exponentialRampToValueAtTime(0.0001, time + attackTime + decayTime)
		this.ampEnvelope.gain.setValueAtTime(0, time + attackTime + decayTime + 0.1)
	}

	attack(pitch: number) {
    
    const t = this.context.currentTime
		this.osc.frequency.setValueAtTime(
			this.centToFrequency(
				this.tuning,
				this.midiToFrequency(pitch)), t );
		this.triggerVolumeEnvelope(t)
		this.triggerFilterEnvelope(t)
		// console.log(this.osc.frequency)
		// console.log(this.filterOne.Q)
    
    // this.filterOne.frequency.cancelScheduledValues(t)
    // this.filterTwo.frequency.cancelScheduledValues(t)

		// this.filterOne.Q.setValueAtTime(res, t)
		// this.filterTwo.Q.setValueAtTime(res, t)

    // this.filterOne.frequency.linearRampToValueAtTime(this.cutoffFreq, t + 0.06)
    // this.filterTwo.frequency.linearRampToValueAtTime(this.cutoffFreq, t + 0.06)

		// this.filterOne.frequency.linearRampToValueAtTime(600, t + 0.06 + (this.decay / 4))
    // this.filterTwo.frequency.linearRampToValueAtTime(600, t + 0.06 + (this.decay / 4))

    // this.ampEnvelope.gain.cancelScheduledValues(t)
    // this.ampEnvelope.gain.exponentialRampToValueAtTime(1, t + 0.06)
		// this.ampEnvelope.gain.linearRampToValueAtTime(0.0001, t + 0.06 + this.decay)
	}

	release() {
      const t = this.context.currentTime
			this.ampEnvelope.gain.cancelScheduledValues(t)
      this.ampEnvelope.gain.setTargetAtTime(0, t, 0.02)
  }
}

export { Voice303 };
