import styled from 'styled-components';
import {
	ControlPanel,
	FirstPanel,
	SecondPanel,
} from './303Components';
import { Pallete303 } from './303Components/Palette';
import { usePattern } from '../hooks';

const MainCase = styled.div`
  font-family: 'Inter';
  width: 1080px;
  height: 520px;
  background-image: radial-gradient(${Pallete303.CaseSilver}, ${Pallete303.CaseShadow} 20%, ${Pallete303.CaseSilver});
  background-color: ${Pallete303.CaseSilver};
  padding-top: 3px;
  border-radius: 3px;`

const AcidPattern303 = () => {
	const { createSynth } = usePattern()

	return (
		<MainCase onClick={createSynth}>
			<FirstPanel />
			<SecondPanel />
			<ControlPanel />
		</MainCase>
	);
};

export { AcidPattern303 }
