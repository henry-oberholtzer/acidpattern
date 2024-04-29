import styled from 'styled-components';
import { Key } from '.';
import { Pallete303 } from './Palette';

const KeyboardContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 480px;
	height: 210px;
	border: 1px solid ${Pallete303.Black};
	margin: 1px;
	margin-right: 0px;
	border-radius: 2px 0px 0px 2px;
`;

const Keyboard = () => {


	return (
		<KeyboardContainer>
			<Key
				value={36}
				name={'C'}
				number={1}
			/>
			<Key
				name={'C#'}
				value={37}
				index={0}
			/>
			<Key
				value={38}
				name={'D'}
				number={2}
			/>
			<Key
				name={'D#'}
				value={39}
			/>
			<Key
				value={40}
				name={'E'}
				number={3}
			/>
			<Key
				value={41}
				name={'F'}
				number={4}
			/>
			<Key
				name={'F#'}
				value={42}
			/>
			<Key
				value={43}
				name={'G'}
				number={5}
			/>
			<Key
				name={'G#'}
				value={44}
			/>
			<Key
				value={45}
				name={'A'}
				number={6}
			/>
			<Key
				name={'A#'}
				value={46}
			/>
			<Key
				value={47}
				name={'B'}
				number={7}
			/>
			<Key
				value={48}
				name={'C'}
				number={8}
			/>
		</KeyboardContainer>
	);
};

export { Keyboard };
