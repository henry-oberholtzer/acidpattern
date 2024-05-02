class Voice303 {
	private context: AudioContext;
	private osc: OscillatorNode;
	private filterOne: BiquadFilterNode;
  private filterTwo: BiquadFilterNode;
	private ampEnvelope: GainNode;
	private volumeNode: GainNode;
  private filterMin = 200;
  private filterMax = 9000;
	private oscOn = false

	run: boolean;
	
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
    return this.filterMin + value * ((this.filterMax - this.filterMin) / 127)
  }

	ccToResonance(value: number) {
		return 16 * (value/127)
	}

	constructor(settings: Settings) {
		this.tempo = settings.tempo;
		this.tuning = settings.tuning;
		this.cutoffFreq = this.ccToCutoff(settings.cut_off_freq);
		this.resonance = this.ccToResonance(settings.resonance)
		this.envMod = settings.env_mod;
		this.decay = settings.decay;
		this.accent = settings.accent;
		this.waveform = settings.waveform;
		this.volume = 63
		this.run = false
		this.context = new AudioContext();

		this.osc = new OscillatorNode(this.context, {
			frequency: 440,
			type: this.waveform === "saw" ? "sawtooth" : "square",
		});
		this.osc.type = 'square';
		this.filterOne = new BiquadFilterNode(this.context, {
			type: 'lowpass',
			frequency: 400,
      Q: 1,
		});
    this.filterTwo = new BiquadFilterNode(this.context, {
			type: 'lowpass',
			frequency: 400,
      Q: 1,
		});
		this.ampEnvelope = new GainNode(this.context, { gain: 0 });
		this.volumeNode = new GainNode(this.context, { gain: 1});
	}

	setTempo(value: number) {
    this.tempo = 60000/(value*4)
	}

  setCutoff(value: number) {
		this.cutoffFreq = this.ccToCutoff(value);
  }

	setTuning(value: number) {
		this.tuning = value
	}

	setResonance(value: number) {
		this.resonance = this.ccToResonance(value)
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

	newOsc(pitch: Pitch) {
		this.osc = new OscillatorNode(this.context, {
			frequency: this.centToFrequency(
				this.tuning,
				this.midiToFrequency(pitch.pitch + pitch.octave)),
			type: this.waveform === "saw" ? "sawtooth" : "square",
		});
		this.osc
			.connect(this.filterOne)
      .connect(this.filterTwo)
			.connect(this.ampEnvelope)
			.connect(this.volumeNode)
			.connect(this.context.destination);
		this.osc.start()
	}

	adjustWaveform(waveform: 'saw' | 'square') {
		this.waveform = waveform
	}

	triggerFilterEnvelope(time: number, accent: boolean) {
		const attackTime = accent ? .2 : 0.015
		const decayTime = accent ? .2 : .2 + (2 * (this.decay/127))
		const cutoff = this.filterMin + ((this.cutoffFreq - this.filterMin) * (this.envMod / 127))
		this.filterOne.Q.linearRampToValueAtTime(this.resonance * (this.envMod/127), time)
		this.filterTwo.Q.linearRampToValueAtTime(this.resonance  * (this.envMod/127), time)
		console.log(this.filterOne.Q)
		this.filterOne.frequency.cancelScheduledValues(time)
		this.filterTwo.frequency.cancelScheduledValues(time)
		// Attack
		this.filterOne.frequency.linearRampToValueAtTime(cutoff, time + attackTime)
    this.filterTwo.frequency.linearRampToValueAtTime(cutoff, time  + attackTime)
		// Decay
		this.filterOne.frequency.exponentialRampToValueAtTime(this.filterMin, time + attackTime + decayTime)
    this.filterTwo.frequency.exponentialRampToValueAtTime(this.filterMin, time + attackTime + decayTime)

	}

	triggerVolumeEnvelope(time: number, accent: boolean) {
		const attackTime = 0.015
		const decayTime = 4
		const gainAmount = accent ? 0.5 + 0.5 * (this.accent/127) : 0.5
		this.ampEnvelope.gain.cancelScheduledValues(time)
		this.ampEnvelope.gain.setTargetAtTime(gainAmount, time, attackTime)
		this.ampEnvelope.gain.exponentialRampToValueAtTime(0.0001, time + attackTime + decayTime)
		this.ampEnvelope.gain.setValueAtTime(0, time + attackTime + decayTime + 0.1)
	}

	attack(pitch: Pitch, time: number | null = null) {
		if (this.oscOn) {
			this.release()
		}
		this.oscOn = true
		const t = time ? time : this.context.currentTime
		this.newOsc(pitch)
		this.triggerVolumeEnvelope(t, pitch.accent)
		this.triggerFilterEnvelope(t, pitch.accent)
	}

	slide(pitch: Pitch, time: number | null = null) {
		const t = time ? time : this.context.currentTime
		this.osc.frequency.linearRampToValueAtTime(
			this.centToFrequency(
				this.tuning, 
				this.midiToFrequency(pitch.pitch + pitch.octave)), t)
	}

	release(time: number | null = null) {
		const t = time ? time : this.context.currentTime
		if (this.oscOn) {
			this.filterOne.frequency.cancelScheduledValues(t)
			this.filterTwo.frequency.cancelScheduledValues(t)
			this.ampEnvelope.gain.cancelScheduledValues(t)
			this.ampEnvelope.gain.exponentialRampToValueAtTime(0.0001, t + 0.02)
      this.ampEnvelope.gain.setTargetAtTime(0, t, 0.04)
			this.osc.stop(t + 0.04)
		}
  }
}

export { Voice303 };
