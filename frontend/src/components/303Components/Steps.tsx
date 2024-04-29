import { useContext } from 'react';
import { PatternContext } from '../../routes/patterns/PatternCreateView';
import styled from 'styled-components';
import { Pallete303 } from './Palette';

const StepsContainer = styled.div`
	width: 1080px;
	height: 145px;
	padding: 10px;
	display: flex;
	gap: 10px;
	background-color: #ffffff;
	border-radius: 5px;
`;

const SectionContainer = styled.div`
	width: 525px;
	height: 125px;
	border-radius: 2px;
	display: flex;
	border: 1px solid ${Pallete303.CaseSilver};
`;

const SectionName = styled.h4`
	font-size: 12px;
	margin: 0px;
	width: 55px;
`;

const PatternTable = styled.table`
  border-collapse: collapse;
  height: 100px;
  font-size: 12px;
  border: 1px solid ${Pallete303.CaseSilver};
  th, tbody > tr > td {
    border: 1px solid ${Pallete303.CaseSilver};
    text-align: center;
    width: 25px;
    height: 25px;
  }
  th[scope="row"] {
    width: 125px;
    text-align: left;
  }`;

const TableRow = styled.tr``;

const Steps = () => {
	const { timeMode, pitchMode, activeSection, sections } =
		useContext(PatternContext);

	return (
		<StepsContainer>
			<SectionContainer>
				<PatternTable>
					<thead>
						<th>A</th>
						{timeMode.get.map((t, i) => {
							return <th scope="col">{i + 1}</th>;
						})}
					</thead>
					<tbody>
						<tr>
							<th scope="row">Time</th>
							{timeMode.get.map((t) => {
								return (
									<td>
										{t.timing === 1
											? '\u{26AB}'
											: t.timing === 2
											? '\u{2218}'
											: '\u{2013}'}
									</td>
								);
							})}
						</tr>
						<tr>
							<th scope="row">Pitch</th>
							{timeMode.get.map((t) => {
								return (
									<td>
										{t.timing === 1
											? '\u{26AB}'
											: t.timing === 2
											? '\u{2218}'
											: '\u{2013}'}
									</td>
								);
							})}
						</tr>
						<tr>
							<th scope="row">Octave</th>
							{timeMode.get.map((t) => {
								return (
									<td>
										{t.timing === 1
											? '\u{26AB}'
											: t.timing === 2
											? '\u{2218}'
											: '\u{2013}'}
									</td>
								);
							})}
						</tr>
						<tr>
							<th scope="row">Slide / Accent</th>
							{timeMode.get.map((t) => {
								return (
									<td>
										{t.timing === 1
											? '\u{26AB}'
											: t.timing === 2
											? '\u{2218}'
											: '\u{2013}'}
									</td>
								);
							})}
						</tr>
					</tbody>
				</PatternTable>
			</SectionContainer>
			<SectionContainer>
			</SectionContainer>
		</StepsContainer>
	);
};

export { Steps };
