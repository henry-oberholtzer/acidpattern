import { BorderContainer, ButtonTB, LED, Label, TimeModeKeys } from '.';
import styled from 'styled-components';
import { Pallete303 } from './Palette';
import { PatternContext } from '../../routes/patterns/PatternCreateView';
import { useContext } from 'react';
import tiedNote from "./svgs/tied_note.svg"
import sixteenthNote from "./svgs/sixteenth_note.svg"
import restNote from "./svgs/rest_note.svg"

const TitleDiv = styled.div`
	height: 30px;
	width: 240px;
	display: flex;
  flex-direction: column;
  align-items: center;
	justify-content: center;
	border-left: 10px solid ${Pallete303.Black};
  border-right: 10px solid transparent;
`;

const LegendDiv = styled.div`
	height: 26px;
	width: 240px;
	display: flex;
`;

const LegendDividingDiv = styled.div<{ $background?: string }>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 60px;
	height: 26px;
	background-image: url(${props => props.$background});
	border-right: 1px solid ${Pallete303.Black};
	&:first-of-type {
		border-left: 10px solid ${Pallete303.Black};
	}
`;

const TimeModeControls = () => {
	const { mode } = useContext(PatternContext)

	return (
		<BorderContainer
			$width={240}
			$height={210}>
			<TitleDiv>
					<Label
						htmlFor="time-mode"
						$height={16}>
						Time Mode
					</Label>
					<LED active={mode.get === 'time'} margin={"0"} />
			</TitleDiv>
			<LegendDiv>
				<LegendDividingDiv $background={sixteenthNote}></LegendDividingDiv>
				<LegendDividingDiv $background={tiedNote}></LegendDividingDiv>
				<LegendDividingDiv $background={restNote}></LegendDividingDiv>
				<LegendDividingDiv>
					<ButtonTB
						name="enable-time-mode"
						horizontal={true}
						onClick={() => mode.set('time')}
					/>
				</LegendDividingDiv>
			</LegendDiv>
      <TimeModeKeys />
		</BorderContainer>
	);
};

export { TimeModeControls };
