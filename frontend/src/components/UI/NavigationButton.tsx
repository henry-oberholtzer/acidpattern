import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Pallete303 } from '../303Components/Palette';

const NavButton = styled.button<{ $color?: string; $bgColor?: string }>`
	height: 40px;
	font-family: 'Inter';
  font-size: 16px;
	background-color: ${(props) =>
		props.$bgColor ? props.$bgColor : Pallete303.ControlPanelColor};
    color: ${(props) => (props.$color ? props.$color : Pallete303.Black)};
  text-align: center;
  text-decoration: none;
  width: 80px;
	display: flex;
	align-items: center;
  border: 0;
  padding: 0 5px;
	border-radius: 2px;
  margin-left: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const NavigationButton = (props: NavButtonProps) => {
	return (
		<Link to={props.to}>
			<NavButton
				$color={props.color}
				$bgColor={props.bgColor}>
				{props.text}
			</NavButton>
		</Link>
	);
};

interface NavButtonProps {
	text: string;
	to: string;
	color?: string;
	bgColor?: string;
}

export { NavigationButton };
