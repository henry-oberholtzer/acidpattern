import styled from 'styled-components';
import { Pallete303 } from '../Palette';
import { format } from 'date-fns';
import { SettingsIndicator } from './SettingsIndicator';
import { usePattern, useAuth } from '../../../hooks';


const Input = styled.input`
	width: 260px;
	height: 30px;
	font-family: 'Inter';
	font-size: 16px;
	margin-bottom: 5px;
`;



const CardText = styled.p<{ $width?: number }>`
	height: 30px;
	${(props) => (props.$width ? `width: ${props.$width}px;` : '')}
	font-family: 'Inter';
	font-size: 16px;
	margin-bottom: 5px;
`;

const InfoDiv = styled.section<{ $height?: number }>`
	width: 500px;
	height: ${props => props.$height}px;
	display: flex;
	flex-direction: column;
	justify-content: start;
`;

const Container = styled.div`
	width: 520px;
	height: 260px;
	margin-left: 40px;
	background-color: white;
	border-radius: 5px;
	padding: 10px 10px;
	box-shadow: 3px 3px 30px ${Pallete303.CaseShadow},
		-3px -3px 30px ${Pallete303.CaseShadow};
`;

const LabelDiv = styled.div<{ $height?: number }>`
	width: 500px;
	height: ${props => props.$height}px;
	display: flex;
	justify-content: start;
  gap: 10px;
	align-items: center;
`;

const FormLabel = styled.label<{ $width?: number }>`
	font-family: 'Inter';
	${(props) => (props.$width ? `width: ${props.$width}px;` : '')}
	font-size: 12px;
	margin: 0;
	color: ${Pallete303.CaseSilver};
	border-top: 2px solid ${Pallete303.CaseSilver};
`;

const TextLabel = styled.p<{ $width?: number }>`
	font-family: 'Inter';
	${(props) => (props.$width ? `width: ${props.$width}px;` : '')}
	font-size: 12px;
	margin: 0;
	color: ${Pallete303.CaseSilver};
	border-top: 2px solid ${Pallete303.CaseSilver};
`;



const PatternCard = () => {
	const { user } = useAuth();
	const { name, tempo, tuning, cutoff, waveform, resonance, envMod, decay, accent} = usePattern();

	return (
		<Container>
			<InfoDiv $height={120}>
				<LabelDiv $height={30}>
					<Input
						type="text"
						name="pattern-name"
						value={name.get}
						onChange={(e) => name.set(e.target.value)}></Input>
					<CardText $width={230}>
						{user?.user ? `${user.user.username}` : ``}
					</CardText>
					
				</LabelDiv>
        <LabelDiv $height={30}>
					<FormLabel
						$width={260}
						htmlFor={'pattern-name'}>
						Pattern Name
					</FormLabel>
					<FormLabel $width={230}>Programmed by</FormLabel>
				</LabelDiv>
        <LabelDiv $height={30}>
          <CardText $width={100}>{waveform.get}</CardText>
          <CardText $width={40}>{tempo.get}</CardText>
					<CardText $width={100}>{format(Date.now(), "MM/dd/yyyy")}</CardText>
        </LabelDiv>
        <LabelDiv $height={30}>
          <TextLabel $width={100}>Waveform</TextLabel>
          <TextLabel $width={40}>BPM</TextLabel>
					<TextLabel $width={100}>Date</TextLabel>
        </LabelDiv>
			</InfoDiv>
      <InfoDiv $height={120}>
        <LabelDiv $height={30}>
        <TextLabel $width={500}>Settings</TextLabel>
        </LabelDiv>
        <LabelDiv $height={70}>
          <SettingsIndicator 
            value={tuning.get}
            min={-500}
            max={500}
            steps={1000}
          />
          <SettingsIndicator 
            value={cutoff.get}
            min={0}
            max={127}
            steps={128}
          />
          <SettingsIndicator 
            value={resonance.get}
            min={0}
            max={127}
            steps={128}
          />
          <SettingsIndicator 
            value={envMod.get}
            min={0}
            max={127}
            steps={128}
          />
          <SettingsIndicator 
            value={decay.get}
            min={0}
            max={127}
            steps={128}
          />
          <SettingsIndicator 
            value={accent.get}
            min={0}
            max={127}
            steps={128}
          />
        </LabelDiv>
        <LabelDiv $height={30}>
          <TextLabel $width={70}>
            Tuning
          </TextLabel>
          <TextLabel $width={70}>
            Cutoff
          </TextLabel>
          <TextLabel $width={70}>
            Resonance
          </TextLabel>
          <TextLabel $width={70}>
            Envelope
          </TextLabel>
          <TextLabel $width={70}>
            Decay
          </TextLabel>
          <TextLabel $width={70}>
            Accent
          </TextLabel>
        </LabelDiv>
      </InfoDiv>
		</Container>
	);
};

export { PatternCard };
