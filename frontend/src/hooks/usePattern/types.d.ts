interface PatternProviderProps extends React.PropsWithChildren {
	pattern: Pattern;
}

interface PatternContext {
  id: { get: number | null },
  name: { set: Dispatch<SetStateAction<string>>; get: string | null };
  date: { get: string | null },
  author: { get: string | null },
	activeIndex: { set: Dispatch<SetStateAction<number>>; get: number };
	pitchMode: { set: Dispatch<SetStateAction<Pitch[]>>; get: Pitch[] };
	timeMode: { set: Dispatch<SetStateAction<Time[]>>; get: Time[] };
	index: { next: () => void; back: () => void; current: number };
	mode: {
		set: Dispatch<SetStateAction<'pitch' | 'time' | 'normal'>>;
		get: 'pitch' | 'time' | 'normal';
	};
	waveform: {
		set: Dispatch<SetStateAction<'saw' | 'square'>>;
		get: 'saw' | 'square';
	};
	tuning: { set: Dispatch<SetStateAction<number>>; get: number };
	cutoff: { set: Dispatch<SetStateAction<number>>; get: number };
	resonance: { set: Dispatch<SetStateAction<number>>; get: number };
	decay: { set: Dispatch<SetStateAction<number>>; get: number };
	envMod: { set: Dispatch<SetStateAction<number>>; get: number };
	accent: { set: Dispatch<SetStateAction<number>>; get: number };
	tempo: { set: Dispatch<SetStateAction<number>>; get: number };
	volume: { set: Dispatch<SetStateAction<number>>; get: number };
	run: { set: Dispatch<SetStateAction<boolean>>; get: boolean };
	sections: {
		set: Dispatch<SetStateAction<[Section, Section]>>;
		get: [Section, Section];
	};
	activeSection: { set: Dispatch<SetStateAction<'A' | 'B'>>; get: 'A' | 'B' };
	synth: React.MutableRefObject<Voice303 | null> | null;
  createSynth: () => void;
  disconnectSynth: () => void;
}
