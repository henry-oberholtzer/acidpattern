import styled from 'styled-components';
import { Key, KeySharp } from '.';
import { Pallete303 } from './Palette';

const KeyboardContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 480px;
	height: 210px;
	border: 1px solid ${Pallete303.Black};
	margin: 1px;
	border-radius: 2px;
`;

const Keyboard = (props: KeyboardProps) => {
	return (
		<KeyboardContainer>
			<Key
				callbackFunction={props.callbackFunction}
				value={36}
				name={'C'}
				number={1}
			/>
			<KeySharp
				callbackFunction={props.callbackFunction}
				index={0}
				name={'C#'}
				value={37}
			/>
			<Key
				callbackFunction={props.callbackFunction}
				value={38}
				name={'D'}
				number={2}
			/>
			<KeySharp
				callbackFunction={props.callbackFunction}
				index={1}
				name={'D#'}
				value={39}
			/>
			<Key
				callbackFunction={props.callbackFunction}
				value={40}
				name={'E'}
				number={3}
			/>
			<Key
				callbackFunction={props.callbackFunction}
				value={41}
				name={'F'}
				number={4}
			/>
			<KeySharp
				callbackFunction={props.callbackFunction}
				index={3}
				name={'F#'}
				value={42}
			/>
			<Key
				callbackFunction={props.callbackFunction}
				value={43}
				name={'G'}
				number={5}
			/>
			<KeySharp
				callbackFunction={props.callbackFunction}
				index={4}
				name={'G#'}
				value={44}
			/>
			<Key
				callbackFunction={props.callbackFunction}
				value={45}
				name={'A'}
				number={6}
			/>
			<KeySharp
				callbackFunction={props.callbackFunction}
				index={5}
				name={'A#'}
				value={46}
			/>
			<Key
				callbackFunction={props.callbackFunction}
				value={47}
				name={'B'}
				number={7}
			/>
			<Key
				callbackFunction={props.callbackFunction}
				value={48}
				name={'C'}
				number={8}
			/>
		</KeyboardContainer>
	);
};

interface KeyboardProps {
	callbackFunction: (arg0: number) => void;
}

export { Keyboard };
