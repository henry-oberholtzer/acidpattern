import styled from 'styled-components';
import { Pallete303 } from './Palette';
import { LCDButton } from './PatternInfo';
import { usePattern } from '../../hooks';
import { useContext } from 'react';
import { PatternClearModalContext } from '../../routes';

const Modal = styled.div`
	display: flex;
	flex-direction: column;
	border: 2px solid ${Pallete303.LCDFont};
	background-color: ${Pallete303.LCDBackground};
	color: ${Pallete303.LCDFont};
	padding: 4px;
`;

const SectionOptionGroup = styled.div<{
	$row?: boolean;
	$evenSpace?: boolean;
	$noMargin?: boolean;
}>`
	display: flex;
	gap: 2px;
	${(props) => (props.$noMargin ? '' : 'margin-bottom: 2px;')}

	${(props) => (props.$evenSpace ? '' : 'justify-content: space-between;')}
  ${(props) => (props.$row ? '' : 'flex-direction: column;')}
`;

const SectionLabel = styled.p<{ $width?: number; $center?: boolean }>`
	font-size: 14px;
	height: 20px;
	${(props) => (props.$center ? 'text-align: center;' : '')}
	margin-bottom: 2px;
	margin: 0;
	width: ${(props) => (props.$width ? props.$width : 8 * 15)}px;
`;

const PatternClearModal = () => {
	const { activeSection, timeMode, pitchMode, sections, name } =
		usePattern();
		const patternClearModal = useContext(PatternClearModalContext)

	const closeModal = () => {
		patternClearModal.set(false);
	};

	const clearProperty = (property: string) => {
		return (section: 'A' | 'B') => {
			if (property === 'pitch') {
				if (activeSection.get === section) {
					pitchMode.set([]);
				} else {
					const newSections: [Section, Section] = [...sections.get];
					if (section === 'B') {
						newSections[1].pitch_mode = [];
					} else {
						newSections[0].pitch_mode = [];
					}
					sections.set(newSections);
				}
			} else if (property === 'time') {
				if (activeSection.get === section) {
					timeMode.set([]);
				} else {
					const newSections: [Section, Section] = [...sections.get];
					if (section === 'B') {
						newSections[1].time_mode = [];
					} else {
						newSections[0].time_mode = [];
					}
					sections.set(newSections);
				}
			} else if (property === 'slides') {
				if (activeSection.get === section) {
					const noSlides = pitchMode.get.map((p) => {
						p.slide = false;
						return p
					})
					pitchMode.set(noSlides);
				} else {
					const newSections: [Section, Section] = [...sections.get];
					if (section === 'B') {
						const noSlides = newSections[1].pitch_mode.map((p) => {
							p.slide = false;
							return p
						})
						newSections[1].pitch_mode = noSlides;
					} else {
						const noSlides = newSections[0].pitch_mode.map((p) => {
							p.slide = false;
							return p
						})
						newSections[0].pitch_mode = noSlides;
					}
					sections.set(newSections);
				}
			} else if (property === "accents") {
				if (activeSection.get === section) {
					const noSlides = pitchMode.get.map((p) => {
						p.accent = false;
						return p
					})
					pitchMode.set(noSlides);
				} else {
					const newSections: [Section, Section] = [...sections.get];
					if (section === 'B') {
						const noSlides = newSections[1].pitch_mode.map((p) => {
							p.accent = false;
							return p
						})
						newSections[1].pitch_mode = noSlides;
					} else {
						const noSlides = newSections[0].pitch_mode.map((p) => {
							p.accent = false;
							return p
						})
						newSections[0].pitch_mode = noSlides;
					}
					sections.set(newSections);
				}
			}
			closeModal()
		};
	};

	const clearPitch = clearProperty('pitch');
	const clearTime = clearProperty('time');
	const clearAccent = clearProperty('accents')
	const clearSlide = clearProperty('slides')

	const clearEverything = () => {
		sections.set([{ name: "A", time_mode: [], pitch_mode: []}, { name: "B", time_mode: [], pitch_mode: []}])
		timeMode.set([])
		pitchMode.set([])
		name.set("")
		closeModal()
	}

	return (
		<Modal>
			<SectionOptionGroup
				$row
				$evenSpace>
				<SectionLabel
					$width={400}
					$center>
					Pattern Clear
				</SectionLabel>
				<LCDButton
					$width={4 * 15}
					onClick={closeModal}>
					Exit
				</LCDButton>
			</SectionOptionGroup>
			<SectionOptionGroup
				$row
				$evenSpace>
				<div>
					<SectionLabel
						$center
						$width={2 * (15 * 7) + 2}>
						Section A
					</SectionLabel>
					<SectionOptionGroup $row>
						<SectionOptionGroup>
							<LCDButton
								$width={15 * 7}
								onClick={() => clearPitch("A")}>
								Pitch
							</LCDButton>
							<LCDButton
								$width={15 * 7}
								onClick={() => clearAccent("A")}>
								Accents
							</LCDButton>
						</SectionOptionGroup>
						<SectionOptionGroup>
							<LCDButton
								$width={15 * 7}
								onClick={() => clearTime("A")}>
								Time
							</LCDButton>
							<LCDButton
								$width={15 * 7}
								onClick={() => clearSlide("A")}>
								Slides
							</LCDButton>
						</SectionOptionGroup>
					</SectionOptionGroup>
				</div>
				<div>
					<SectionLabel
						$center
						$width={2 * (15 * 7) + 2}>
						Section B
					</SectionLabel>
					<SectionOptionGroup $row>
						<SectionOptionGroup>
							<LCDButton $width={15 * 7}
							onClick={() => clearPitch("B")}>Pitch</LCDButton>
							<LCDButton $width={15 * 7}
							onClick={() => clearAccent("B")}>Accents</LCDButton>
						</SectionOptionGroup>
						<SectionOptionGroup>
							<LCDButton $width={15 * 7}
							onClick={() => clearTime("B")}>Time</LCDButton>
							<LCDButton $width={15 * 7}
							onClick={() => clearSlide("B")}>Slides</LCDButton>
						</SectionOptionGroup>
					</SectionOptionGroup>
				</div>
			</SectionOptionGroup>
			<LCDButton
				$width={15 * 40}
				onClick={clearEverything}>
				Clear Everything
			</LCDButton>
		</Modal>
	);
};

export { PatternClearModal };
