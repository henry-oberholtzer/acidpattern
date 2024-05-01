import { Dispatch, SetStateAction, createContext, useRef, useState } from 'react';
import { AcidPattern303 } from '../../components/AcidPattern303';
import { Voice303 } from '../../components/303Components/Voice303';
import { GroupDiv } from '../../components/303Components';

const PatternContext = createContext<PatternContext>({
	activeIndex: { set: (number) => {number}, get: 63},
	pitchMode: { set: (pitch) => {pitch}, get: []},
	timeMode: { set: (pitch) => {pitch}, get: []},
	sections: { set: (section) => {section}, get: [{ name: "A", time_mode: [], pitch_mode: []}, { name: "B", time_mode: [], pitch_mode: []},]},
	activeSection: { set: (string) => {string}, get: "A" },
	mode: { set: (string) => {string}, get: "normal"},
	name: { set: (string) => {string}, get: "normal"},
	index: { next: () => {}, back: () => {}, current: 0},
	waveform: { set: (string) => {string}, get: "saw"},
	tuning: { set: (number) => {number}, get: 63},
	cutoff: { set: (number) => {number}, get: 63},
	decay: { set: (number) => {number}, get: 63},
	resonance: { set: (number) => {number}, get: 63},
	envMod: { set: (number) => {number}, get: 63},
	accent: { set: (number) => {number}, get: 63},
	tempo: { set: (number) => {number}, get: 63},
	volume: { set: (number) => {number}, get: 63},
	run: { set: (bool) => {bool}, get: false},
	synth: null,
	advanceIndex: () => {}
})

interface PatternContext {
	activeIndex: { set: Dispatch<SetStateAction<number>>, get: number},
	pitchMode: { set: Dispatch<SetStateAction<Pitch[]>>, get: Pitch[]},
	timeMode: { set: Dispatch<SetStateAction<Time[]>>, get: Time[]},
	advanceIndex: () => void;
	index: { next: () => void, back: () => void, current: number},
	mode: { set: Dispatch<SetStateAction<"pitch" | "time" | "normal">>, get: "pitch" | "time" | "normal"},
	name: { set: Dispatch<SetStateAction<string>>, get: string},
	waveform: { set: Dispatch<SetStateAction<"saw" | "square">>, get: "saw" | "square" },
	tuning: { set: Dispatch<SetStateAction<number>>, get: number},
	cutoff: { set: Dispatch<SetStateAction<number>>, get: number},
	resonance: { set: Dispatch<SetStateAction<number>>, get: number},
	decay: { set: Dispatch<SetStateAction<number>>, get: number},
	envMod: { set: Dispatch<SetStateAction<number>>, get: number},
	accent: { set: Dispatch<SetStateAction<number>>, get: number},
	tempo: { set: Dispatch<SetStateAction<number>>, get: number},
	volume: { set: Dispatch<SetStateAction<number>>, get: number},
	run: { set: Dispatch<SetStateAction<boolean>>, get: boolean},
	sections: { set: Dispatch<SetStateAction<[Section, Section]>>, get: [Section, Section]},
	activeSection: { set: Dispatch<SetStateAction<"A"|"B">>, get: "A" | "B"},
	synth: React.MutableRefObject<Voice303 | null> | null,
}

const PatternCreateView = (props: PatternCreateProps) => {
	const [name, setName] = useState(props.pattern? props.pattern.name : `New Pattern`);
	const [mode, setMode] = useState<"pitch" | "time" | "normal">("normal")
	const [sections, setSections] = useState<[Section, Section]>(props.pattern? props.pattern.sections : [{ name: "A", time_mode: [], pitch_mode: []}, { name: "B", time_mode: [], pitch_mode: []}])
	const [activeSection, setActiveSection] = useState<"A" | "B">("A")
	const [pitchMode, setPitchMode] = useState<Pitch[]>([])
	const [timeMode, setTimeMode] = useState<Time[]>([])
	const [activeIndex, setActiveIndex] = useState<number>(0)
	// Settings state
	const [waveform, setWaveform] = useState<"saw" | "square">("saw")

	const [tuning, setTuning] = useState<number>(0)
	const [cutOffFreq, setCutoffFreq] = useState<number>(63)
	const [resonance, setResonance] = useState<number>(63)
	const [envMod, setEnvMod] = useState<number>(63)
	const [decay, setDecay] = useState<number>(63)
	const [accent, setAccent] = useState<number>(63)
	// Second panel settings
	const [tempo, setTempo] = useState<number>(130)
	const [volume, setVolume] = useState<number>(127)
	// Transport
	const [run, setRun] = useState<boolean>(false)

	const synth = useRef<Voice303 | null>(null)

	const advanceIndex = () => {
			setActiveIndex(activeIndex + 1);
			if ((mode === "pitch" && pitchMode.length === 16 && activeIndex >= 15) || (mode === "time" && timeMode.length === 16 && activeIndex >= 15)) {
				setMode("normal");
			}
	}

	const reverseIndex = () => {
		if (activeIndex != 0) {
			setActiveIndex(activeIndex - 1);
		}
	}

	return (
			<PatternContext.Provider value={{ 
				activeIndex: { set: setActiveIndex, get: activeIndex },
				pitchMode: { set: setPitchMode, get: pitchMode },
				timeMode: { set: setTimeMode, get: timeMode},
				index: { next: advanceIndex, back: reverseIndex, current: activeIndex},
				mode: { set: setMode, get: mode},
				name: { set: setName, get: name},
				run: {set: setRun, get: run},
				waveform: { set: setWaveform, get: waveform},
				tuning: { set: setTuning, get: tuning},
				cutoff: { set: setCutoffFreq, get: cutOffFreq},
				decay: { set: setDecay, get: decay},
				resonance: { set: setResonance, get: resonance},
				envMod: { set: setEnvMod, get: envMod},
				accent: { set: setAccent, get: accent},
				tempo: { set: setTempo, get: tempo},
				volume: { set: setVolume, get: volume},
				synth: synth,
				activeSection: { set: setActiveSection, get: activeSection},
				sections: { set: setSections, get: sections},
				advanceIndex: advanceIndex}}>
					<GroupDiv>
						<div onClick={() => synth.current === null ? synth.current = new Voice303({
							tempo: tempo,
							tuning: tuning,
							cut_off_freq: cutOffFreq,
							resonance: resonance,
							env_mod: envMod,
							decay: decay,
							accent: accent,
							waveform: waveform
						}) : ""}>
							<AcidPattern303/>
						</div>
					</GroupDiv>
			</PatternContext.Provider>
	);
};

interface PatternCreateProps {
	pattern?: Pattern;
}

export { PatternCreateView, PatternContext };
