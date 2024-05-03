import { createContext, useContext, useRef, useState } from 'react';
import { Voice303 } from '../../components/303Components/Voice303';

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
});

const PatternProvider = (props: PatternProviderProps) => {
	// Pattern information
	const [id] = useState(props.pattern.id ? props.pattern.id : null);
	const [name, setName] = useState(props.pattern.name);
	const [date] = useState(props.pattern.date ? props.pattern.date : null);
	const [author] = useState(props.pattern.author ? props.pattern.author : null);
	// Settings
	const [waveform, setWaveform] = useState<'saw' | 'square'>(props.pattern.settings.waveform);
	const [tempo, setTempo] = useState<number>(props.pattern.settings.tempo);
	const [tuning, setTuning] = useState<number>(props.pattern.settings.tuning);
	const [cutOffFreq, setCutoffFreq] = useState<number>(props.pattern.settings.cut_off_freq);
	const [resonance, setResonance] = useState<number>(props.pattern.settings.resonance);
	const [envMod, setEnvMod] = useState<number>(props.pattern.settings.env_mod);
	const [decay, setDecay] = useState<number>(props.pattern.settings.decay);
	const [accent, setAccent] = useState<number>(props.pattern.settings.accent);
	// Sections
	const [sections, setSections] = useState<[Section, Section]>(props.pattern.sections);
	const [activeSection, setActiveSection] = useState<'A' | 'B'>(props.pattern.sections[0].name);
	const [pitchMode, setPitchMode] = useState<Pitch[]>(props.pattern.sections[0].pitch_mode);
	const [timeMode, setTimeMode] = useState<Time[]>(props.pattern.sections[0].time_mode);
	// Transport & Operational States
	const [volume, setVolume] = useState<number>(127);
	const [mode, setMode] = useState<'pitch' | 'time' | 'normal'>('normal');
	const [run, setRun] = useState<boolean>(false);
	const synth = useRef<Voice303 | null>(null);
	const createSynth = () => {
		synth.current === null ? synth.current = new Voice303({
			tempo: tempo,
			tuning: tuning,
			cut_off_freq: cutOffFreq,
			resonance: resonance,
			env_mod: envMod,
			decay: decay,
			accent: accent,
			waveform: waveform
	}) : null}
	const disconnectSynth = () => {
		synth.current = null
	}


	const [activeIndex, setActiveIndex] = useState<number>(0);
	const advanceIndex = () => {
		setActiveIndex(activeIndex + 1);
		if (
			(mode === 'pitch' && pitchMode.length === 16 && activeIndex >= 15) ||
			(mode === 'time' && timeMode.length === 16 && activeIndex >= 15)
		) {
			setMode('normal');
		}
	};
	const reverseIndex = () => {
		if (activeIndex != 0) {
			setActiveIndex(activeIndex - 1);
		}
	};

	const value = {
		id: { get: id },
		name: { set: setName, get: name },
		author: { get: author },
		date: { get: date },
		waveform: { set: setWaveform, get: waveform },

		activeIndex: { set: setActiveIndex, get: activeIndex },
		pitchMode: { set: setPitchMode, get: pitchMode },
		timeMode: { set: setTimeMode, get: timeMode },
		index: { next: advanceIndex, back: reverseIndex, current: activeIndex },
		mode: { set: setMode, get: mode },
		run: { set: setRun, get: run },
		tuning: { set: setTuning, get: tuning },
		cutoff: { set: setCutoffFreq, get: cutOffFreq },
		decay: { set: setDecay, get: decay },
		resonance: { set: setResonance, get: resonance },
		envMod: { set: setEnvMod, get: envMod },
		accent: { set: setAccent, get: accent },
		tempo: { set: setTempo, get: tempo },
		volume: { set: setVolume, get: volume },
		synth: synth,
		activeSection: { set: setActiveSection, get: activeSection },
		sections: { set: setSections, get: sections },
		createSynth: createSynth,
		disconnectSynth: disconnectSynth,
	};

	return (
		<PatternContext.Provider value={value}>
			{props.children}
		</PatternContext.Provider>
	);
};

const usePattern = () => {
	return useContext(PatternContext);
};

export { usePattern, PatternProvider }
