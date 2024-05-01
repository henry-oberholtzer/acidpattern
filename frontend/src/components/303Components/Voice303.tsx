import { warmSaw } from "./06_Warm_Saw";
import { squareWave } from "./11_TB303_Square";

class Voice303 {
	
	private context: AudioContext;
	private osc: OscillatorNode;
	private filterOne: BiquadFilterNode;
  private filterTwo: BiquadFilterNode;
	private ampEnvelope: GainNode;
	private volumeNode: GainNode;
	private saw: PeriodicWave;
	private square: PeriodicWave;
	
  private filterMin = 200;
  private filterMax = 9000;
	
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
		this.saw = new PeriodicWave(this.context, {
			real: warmSaw.real,
			imag: warmSaw.imag,
		})
		this.square = new PeriodicWave(this.context, {
			real: squareWave.real,
			imag: squareWave.imag,
		})

		this.osc = new OscillatorNode(this.context, {
			frequency: 440,
			type: 'custom',
			periodicWave: this.saw,
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
      this.osc.setPeriodicWave(this.saw)
      console.log(this.osc.type)
		} else {
			this.osc.setPeriodicWave(this.square)
		}
	}


	triggerFilterEnvelope(time: number, accent: boolean) {
		const attackTime = accent ? .2 : 0.015
		const decayTime = accent ? .2 : .2 + (2 * (this.decay/127))
		const cutoff = this.filterMin + ((this.cutoffFreq - this.filterMin) * (this.envMod / 127))
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
		const gainAmount = accent ? 0.5 + 0.4 * (this.accent/127) : 0.5
		this.ampEnvelope.gain.cancelScheduledValues(time)
		this.ampEnvelope.gain.setTargetAtTime(gainAmount, time, attackTime)
		this.ampEnvelope.gain.exponentialRampToValueAtTime(0.0001, time + attackTime + decayTime)
		this.ampEnvelope.gain.setValueAtTime(0, time + attackTime + decayTime + 0.1)
	}

	attack(pitch: Pitch) {
    
    const t = this.context.currentTime
		this.osc.frequency.setValueAtTime(
			this.centToFrequency(
				this.tuning,
				this.midiToFrequency(pitch.pitch + pitch.octave)), t );
		this.triggerVolumeEnvelope(t, pitch.accent)
		this.triggerFilterEnvelope(t, pitch.accent)
	}

	release() {
      const t = this.context.currentTime
			this.filterOne.frequency.cancelScheduledValues(t)
			this.filterTwo.frequency.cancelScheduledValues(t)
			this.ampEnvelope.gain.cancelScheduledValues(t)
      this.ampEnvelope.gain.setTargetAtTime(0, t, 0.02)
  }
}

export { Voice303 };
