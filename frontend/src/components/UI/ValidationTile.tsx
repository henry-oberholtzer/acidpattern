import { useState } from 'react';
import { Input, InputGroup, Label } from './TextInput';

import styled from 'styled-components';

const Div = styled.div`
	display: flex;
	align-items: center;
`;

const ValidationTile = (props: ValidationTileProps) => {
  const [small] = useState(Math.round(Math.random() * 4))
  const [large] = useState(Math.round(Math.random() * 5))
	const smallString = small + '0' + small;
	const largeString = large + '0' + large;
	const answer = small + large + '0' + (small + large);

	const handleChange = (input: string) => {
		props.state[1](input === answer);
	};

	return (
		<InputGroup>
			<Label htmlFor={'spam-check'}>x0x Verification:</Label>
			<Div>
				<label htmlFor={'spam-check'}>
					{smallString} + {largeString} ={' '}
				</label>
				<Input
					type={'text'}
					name={'spam-check'}
					placeholder={'???'}
					$validate={true}
					$valid={props.state[0]}
					$textCenter
					$width={50}
					onChange={(e) => handleChange(e.target.value)}></Input>
			</Div>
		</InputGroup>
	);
};

interface ValidationTileProps {
	state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export { ValidationTile };
