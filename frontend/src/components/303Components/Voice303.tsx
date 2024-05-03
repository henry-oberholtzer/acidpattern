class Voice303 {
	private context: AudioContext;
	private osc: OscillatorNode;
	private filterOne: BiquadFilterNode;
  private filterTwo: BiquadFilterNode;
	private ampEnvelope: GainNode;
	private volumeNode: GainNode;
  private filterMin = 200;
  private filterMax = 9000;

	// These are for the sequencer
	private lookAhead = 0.1 // 100ms
	private nextStepTime = 0;
	private pattern: [Time, Pitch | null][] = []
	private step = 0;
	private running = false;
	private sequencerWorker = new Worker('./sequencer-worker.js')
	private workerLookahead = 25
	private stepLength = .125;

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
		this.setTempo(this.tempo)
		this.sequencerWorker.onmessage = (e) => {
			if (e.data == 'tick') {
				this.sequenceScheduler()
			}
		}
		this.sequencerWorker.postMessage({"interval":this.workerLookahead})
	}

	setTempo(value: number) {
    this.tempo = value
		this.stepLength = (60 / value) * .25
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
		this.osc.disconnect()
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
		const attackTime = 0.015
		const decayTime = accent ? .1 : .1 + (2 * (this.decay/127))
		const cutoff = this.filterMin + ((this.cutoffFreq - this.filterMin) * (this.envMod / 127))
		this.filterOne.Q.linearRampToValueAtTime(this.resonance * (this.envMod/127), time)
		this.filterTwo.Q.linearRampToValueAtTime(this.resonance  * (this.envMod/127), time)
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
		const decayTime = accent ? 2 : 4 
		const gainAmount = accent ? 0.2 + 0.8 * (this.accent/127) : 0.2
		this.ampEnvelope.gain.cancelScheduledValues(time)
		this.ampEnvelope.gain.linearRampToValueAtTime(gainAmount, time + attackTime)
		this.ampEnvelope.gain.exponentialRampToValueAtTime(0.0001, time + attackTime + decayTime)
		this.ampEnvelope.gain.setValueAtTime(0, time + attackTime + decayTime + 0.1)
	}

	attack(pitch: Pitch, time: number | null = null) {
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
		this.ampEnvelope.gain.cancelScheduledValues(t)
    this.ampEnvelope.gain.exponentialRampToValueAtTime(0.0001, t + 0.01)
		this.ampEnvelope.gain.linearRampToValueAtTime(0, t + 0.02)
		this.osc.stop(t + 0.02)
  }

	pairedPatternlist(pitch: Pitch[], time: Time[]) {
			const pitches = [...pitch];
			const pairs: [Time, Pitch | null][] = [];
			time.forEach((t) => {
				if (t.timing === 1 && pitches[0]) {
					pairs.push([t, pitches.shift() as Pitch]);
				} else {
					pairs.push([t, null]);
				}
			});
			this.pattern = pairs;
	}

	playPattern(pitch: Pitch[], time: Time[]) {
		this.pairedPatternlist(pitch, time);
		this.running = true
		if (this.running) {
			this.step = 0;
			this.nextStepTime = this.context.currentTime;
			this.sequencerWorker.postMessage("start");
		} else {
			this.stopPattern()
		}
	}

	stopPattern() {
		this.running = false
		this.sequencerWorker.postMessage("stop")
		this.release()
	}

	sequenceScheduler() {
		while (this.nextStepTime < this.context.currentTime + this.lookAhead) {
			this.sequencerScheduleStep();
			this.sequencerAdvance();
		}
	}

	sequencerScheduleStep() {
		const [time, pitch] = this.pattern[this.step]
		
		if(pitch) {
			if (time.timing != 2) {
				this.release(this.nextStepTime)
			}
			this.attack(pitch, this.nextStepTime)
			console.log(this.stepLength)
		}
	}

	sequencerAdvance() {
		this.nextStepTime += this.stepLength
		this.step++
		if (this.step === this.pattern.length) {
			this.step = 0
		}
	}

	
}



export { Voice303 };
