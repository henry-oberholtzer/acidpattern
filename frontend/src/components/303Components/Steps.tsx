import { useContext } from 'react';
import { PatternContext } from '../../routes/patterns/PatternCreateView';
import styled from 'styled-components';
import { Pallete303 } from './Palette';
import chartNote from './svgs/chart_note.svg';
import chartRest from './svgs/chart_rest.svg';
import chartTied from './svgs/chart_tied.svg';

const StepsContainer = styled.div`
	width: 520px;
	height: 145px;
	padding: 10px;
	display: flex;
	gap: 10px;
	background-color: #ffffff;
	border-radius: 5px;
`;

const SectionContainer = styled.div`
	width: 500px;
	height: 125px;
	border-radius: 2px;
	display: flex;
`;

const PatternTable = styled.table`
	border-collapse: collapse;
	border-radius: 2px;
	height: 100px;
	font-size: 12px;
	border: 1px solid ${Pallete303.CaseSilver};
	th,
	tbody > tr > td {
		font-weight: normal;
		border: 1px solid ${Pallete303.CaseSilver};
		text-align: center;
		width: 25px;
		height: 25px;
	}
	th[scope='row'] {
		width: 100px;
		text-align: left;
	}
	tbody > tr > td:nth-of-type(4n + 1),
	th[scope='col']:nth-of-type(4n + 2) {
		background-color: ${Pallete303.CaseSilver}88;
	}
`;

const Steps = () => {
	const { timeMode, pitchMode, activeSection } = useContext(PatternContext);

	const pairedList = () => {
		const pitches = [...pitchMode.get];
		const pairs: [Time, Pitch | null][] = [];
		timeMode.get.forEach((t) => {
			if (t.timing === 1 && pitches[0]) {
				pairs.push([t, pitches.shift() as Pitch]);
			} else {
				pairs.push([t, null]);
			}
		});
		return pairs;
	};

	const pitchToName = (pitch: number) => {
		switch (pitch % 12) {
			case 1:
				return 'C#';
			case 2:
				return 'D';
			case 3:
				return 'D#';
			case 4:
				return 'E';
			case 5:
				return 'F';
			case 6:
				return 'F#';
			case 7:
				return 'G';
			case 8:
				return 'G#';
			case 9:
				return 'A';
			case 10:
				return 'A#';
			case 11:
				return 'B';
			case 12:
				return 'C2';
			default:
				return 'C';
		}
	};

	return (
		<StepsContainer>
			<SectionContainer>
				<PatternTable>
					<tbody>
						<tr>
							<th>{activeSection.get}</th>
							{timeMode.get.map((t, i) => {
								return <th scope="col">{i + 1}</th>;
							})}
						</tr>
						<tr>
							<th scope="row">Time</th>
							{timeMode.get.map((t) => {
								return (
									<td>
										{t.timing === 1 ? (
											<img
												src={chartNote}
												width="12"
												height="12"></img>
										) : t.timing === 2 ? (
											<img
												src={chartTied}
												width="12"
												height="12"></img>
										) : (
											<img
												src={chartRest}
												width="12"
												height="12"></img>
										)}
									</td>
								);
							})}
						</tr>
						<tr>
							<th scope="row">Pitch</th>
							{pairedList().map((pair) => {
								return (
									<td>{pair[1] != null ? pitchToName(pair[1].pitch) : ''}</td>
								);
							})}
						</tr>
						<tr>
							<th scope="row">Octave</th>
							{pairedList().map((pair) => {
								return (
									<td>
										{pair[1] != null
											? pair[1].octave === 12
												? '+'
												: pair[1].octave === -12
												? '-'
												: ''
											: ''}
									</td>
								);
							})}
						</tr>
						<tr>
							<th scope="row">Slide / Accent</th>
							{pairedList().map((pair) => {
								return (
									<td>
										{pair[1] != null
											? pair[1].slide && pair[1].accent
												? 'S/A'
												: pair[1].slide
												? 'S'
												: pair[1].accent
												? 'A'
												: ''
											: ''}
									</td>
								);
							})}
						</tr>
					</tbody>
				</PatternTable>
			</SectionContainer>
		</StepsContainer>
	);
};

export { Steps };
