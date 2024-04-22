import { BorderContainer, ButtonTB, LED, Label, TimeModeKeys } from '.';
import styled from 'styled-components';
import { Pallete303 } from './Palette';

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

const LegendDividingDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 60px;
	height: 26px;
	border-right: 1px solid ${Pallete303.Black};
	&:first-of-type {
		border-left: 10px solid ${Pallete303.Black};
	}
`;

const TimeModeControls = (props: TimeModeControlsProps) => {
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
					<LED active={props.mode === 'time'} margin={"0"} />
			</TitleDiv>

			<LegendDiv>
				<LegendDividingDiv></LegendDividingDiv>
				<LegendDividingDiv></LegendDividingDiv>
				<LegendDividingDiv></LegendDividingDiv>
				<LegendDividingDiv>
					<ButtonTB
						name="enable-time-mode"
						horizontal={true}
						onClick={() => props.setMode('time')}
					/>
				</LegendDividingDiv>
			</LegendDiv>
      <TimeModeKeys 
        value={9}
        name={"step"}
        numbers={[9,0,100,200]}
				activePitch={props.activePitch}
				mode={props.mode}
				callbackFunction={props.callbackFunction}
			/>
		</BorderContainer>
	);
};

interface TimeModeControlsProps {
	activePitch: Pitch;
	callbackFunction: (arg0: string) => void;
	setMode: (value: 'time' | 'pitch' | 'normal') => void;
	mode: 'time' | 'pitch' | 'normal';
}

export { TimeModeControls };
