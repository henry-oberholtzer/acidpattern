import { createContext } from 'react';
import { newPattern } from '../../routes/patterns/pattern-utils';


const PatternContext = createContext<PatternContext>({
	id: { get: null },
	name: {
		set: (string: string) => {
			string;
		},
		get: 'normal',
	},
	date: { get: null },
	author: { get: null },
	activeIndex: {
		set: (number: number) => {
			number;
		},
		get: 63,
	},
	pitchMode: {
		set: (pitch: Pitch[]) => {
			pitch;
		},
		get: [],
	},
	timeMode: {
		set: (pitch: number) => {
			pitch;
		},
		get: [],
	},
	sections: {
		set: (section: [Section, Section]) => {
			section;
		},
		get: [
			{ name: 'A', time_mode: [], pitch_mode: [] },
			{ name: 'B', time_mode: [], pitch_mode: [] },
		],
	},
	activeSection: {
		set: (string: string) => {
			string;
		},
		get: 'A',
	},
	mode: {
		set: (string: string) => {
			string;
		},
		get: 'normal',
	},

	index: { next: () => {}, back: () => {}, current: 0 },
	waveform: {
		set: (string: 'saw' | 'square') => {
			string;
		},
		get: 'saw',
	},
	tuning: {
		set: (number: number) => {
			number;
		},
		get: 63,
	},
	cutoff: {
		set: (number: number) => {
			number;
		},
		get: 63,
	},
	decay: {
		set: (number: number) => {
			number;
		},
		get: 63,
	},
	resonance: {
		set: (number: number) => {
			number;
		},
		get: 63,
	},
	envMod: {
		set: (number: number) => {
			number;
		},
		get: 63,
	},
	accent: {
		set: (number: number) => {
			number;
		},
		get: 63,
	},
	tempo: {
		set: (number: number) => {
			number;
		},
		get: 63,
	},
	volume: {
		set: (number: number) => {
			number;
		},
		get: 63,
	},
	run: {
		set: (bool: boolean) => {
			bool;
		},
		get: false,
	},
	synth: null,
	createSynth: () => {},
	disconnectSynth: () => {},
	patternObject: () => newPattern()
});

export { PatternContext }
