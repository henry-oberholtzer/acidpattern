import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Pallete303 } from '../303Components/Palette';
import { LED } from '../303Components';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const NavButton = styled.button<{ $color?: string; $bgColor?: string }>`
	height: 30px;
	font-family: 'Inter';
  font-size: 16px;
	background-color: ${(props) =>
		props.$bgColor ? props.$bgColor : Pallete303.CaseSilver};
    color: ${(props) => (props.$color ? props.$color : Pallete303.Black)};
  text-align: center;
  text-decoration: none;
  width: 90px;
	display: flex;
	align-items: center;
  border: 0;
	border-top: 4px solid ${Pallete303.CaseHighlight};
  border-bottom: 4px solid ${Pallete303.CaseShadow};
  border-left: 4px solid ${Pallete303.ButtonLeft};
  border-right: 4px solid ${Pallete303.ButtonRight};
  &:hover {
    cursor: pointer;
  }
`;

const NavDiv = styled.div`
	width: 119px;
	height: 36px;
	display: flex;
	justify-content: end;
	align-items: center;
	background-color: ${Pallete303.Black};
	border-radius: 2px 4px 4px 2px;
	padding: 0 5px 0px 0px;
	margin-right: 10px;`

const NavigationButton = (props: NavButtonProps) => {
	const [active, setActive] = useState<boolean>(false)
	const location = useLocation()

	return (
		<NavDiv>
			<LED active={(active || location.pathname === props.to)}/>
			<Link to={props.to}>
				<NavButton
					$color={props.color}
					$bgColor={props.bgColor}
					onMouseDown={() => setActive(true)}
					onMouseUp={() => setActive(false)}>
					{props.text}
					
				</NavButton>
			</Link>
		</NavDiv>
	);
};

interface NavButtonProps {
	text: string;
	to: string;
	color?: string;
	bgColor?: string;
}

export { NavigationButton };