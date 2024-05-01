import styled from 'styled-components';
import {
	ControlPanel,
	FirstPanel,
	SecondPanel,
} from './303Components';
import { Pallete303 } from './303Components/Palette';

const MainCase = styled.div`
  font-family: 'Inter';
  width: 1080px;
  height: 520px;
  background-image: radial-gradient(${Pallete303.CaseSilver}, ${Pallete303.CaseShadow} 20%, ${Pallete303.CaseSilver});
  background-color: ${Pallete303.CaseSilver};
  padding-top: 3px;
  border-radius: 3px;
  box-shadow: 3px 3px 30px ${Pallete303.CaseShadow}, -3px -3px 30px ${Pallete303.CaseShadow};`

const AcidPattern303 = () => {
	return (
		<MainCase>
			<FirstPanel />
			<SecondPanel />
			<ControlPanel />
		</MainCase>
	);
};

export { AcidPattern303 }
