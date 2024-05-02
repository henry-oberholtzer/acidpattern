import { useContext} from 'react';
import { PatternContext } from '../../routes/patterns/PatternCreateView';
import styled from 'styled-components';
import { Pallete303 } from './Palette';
import chartNote from './svgs/chart_note.svg';
import chartRest from './svgs/chart_rest.svg';
import chartTied from './svgs/chart_tied.svg';

const PatternTableStyle = styled.table`
	height: 100px;
	display: block;
	font-size: 14px;
	border-collapse: collapse;
	color: ${Pallete303.LCDFont};
	tbody > tr > th, tbody > tr > td {
		padding: 0;
		font-weight: normal;
		text-align: center;
		width: 30px;
		height: 20px;
		border-top: 2px solid transparent;
		border-bottom: 2px solid ${Pallete303.LCDFont}55;
	}
	th[scope='col'] {
		text-align: center;
	}
	th[scope='row']:first-of-type {
		width: ${14 * 6}px;
		text-align: left;
	}
	tbody > tr > td:nth-of-type(4n + 1),
	th[scope='col']:nth-of-type(4n + 3) {
		background-color: ${Pallete303.LCDFont};
		color: ${Pallete303.LCDBackground};
		border-bottom: 2px solid ${Pallete303.LCDBackground}55;
	}
`;

const Index = styled.th<{ $active?: boolean }>`
	${props => props.$active ? "border: 2px solid ${Pallete303.LCDFont};" : ""}`

const PatternTable = () => {
	const { timeMode, pitchMode, activeSection, } = useContext(PatternContext);

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
				<PatternTableStyle>
					<tbody>
						<tr>
							<th>Section </th>
							<th>{activeSection.get}</th>
							{timeMode.get.map((_, i) => {
								return <Index key={i} scope="col">{i + 1}</Index>
							})}
						</tr>
						<tr>
							<th scope="row">Time</th>
							<th>:</th>
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
							<th>:</th>
							{pairedList().map((pair) => {
								return (
									<td>{pair[1] != null ? pitchToName(pair[1].pitch) : ''}</td>
								);
							})}
						</tr>
						<tr>
							<th scope="row">Octave</th>
							<th>:</th>
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
							<th scope="row">Sld/Acc</th>
							<th>:</th>
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
				</PatternTableStyle>
	);
};

export { PatternTable };
