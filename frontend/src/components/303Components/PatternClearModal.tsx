import styled from 'styled-components';
import { Pallete303 } from './Palette';
import { LCDButton } from './PatternInfo';
import { useContext } from 'react';
import { PatternContext } from '../../routes';

const Modal = styled.div`
	display: flex;
	flex-direction: column;
	border: 2px solid ${Pallete303.LCDFont};
	background-color: ${Pallete303.LCDBackground};
	color: ${Pallete303.LCDFont};
	padding: 4px;
`;

const SectionOptionGroup = styled.div<{
	$row?: boolean;
	$evenSpace?: boolean;
	$noMargin?: boolean;
}>`
	display: flex;
	gap: 2px;
	${(props) => (props.$noMargin ? '' : 'margin-bottom: 2px;')}

	${(props) => (props.$evenSpace ? '' : 'justify-content: space-between;')}
  ${(props) => (props.$row ? '' : 'flex-direction: column;')}
`;

const SectionLabel = styled.p<{ $width?: number; $center?: boolean }>`
	font-size: 14px;
	height: 20px;
	${(props) => (props.$center ? 'text-align: center;' : '')}
	margin-bottom: 2px;
	margin: 0;
	width: ${(props) => (props.$width ? props.$width : 8 * 15)}px;
`;

const PatternClearModal = () => {
  const { patternClearModal } = useContext(PatternContext)

  const closeModal = () => {
    patternClearModal.set(false)
  }

	return (
		<Modal>
      <SectionOptionGroup $row $evenSpace>
				<SectionLabel $width={400}
					$center>
					Pattern Clear
				</SectionLabel>
				<LCDButton $width={4 * 15} onClick={closeModal}>Exit</LCDButton>
      </SectionOptionGroup>
			<SectionOptionGroup $row $evenSpace>
				<div>
					<SectionLabel
						$center
						$width={2 * (15 * 7) + 2}>
						Section A
					</SectionLabel>
					<SectionOptionGroup $row>
						<SectionOptionGroup>
							<LCDButton $width={15 * 7} value={"A-pitch"}>Pitch</LCDButton>
							<LCDButton $width={15 * 7} value={"A-accent"}>Accents</LCDButton>
						</SectionOptionGroup>
						<SectionOptionGroup>
							<LCDButton $width={15 * 7} value={"A-time"}>Time</LCDButton>
							<LCDButton $width={15 * 7} value={"A-slide"}>Slides</LCDButton>
						</SectionOptionGroup>
					</SectionOptionGroup>
				</div>
				<div>
					<SectionLabel
						$center
						$width={2 * (15 * 7) + 2}>
						Section B
					</SectionLabel>
					<SectionOptionGroup $row>
						<SectionOptionGroup>
							<LCDButton $width={15 * 7}>Pitch</LCDButton>
							<LCDButton $width={15 * 7}>Accents</LCDButton>
						</SectionOptionGroup>
						<SectionOptionGroup>
							<LCDButton $width={15 * 7}>Time</LCDButton>
							<LCDButton $width={15 * 7}>Slides</LCDButton>
						</SectionOptionGroup>
					</SectionOptionGroup>
				</div>
			</SectionOptionGroup>
			<LCDButton $width={15 * 40} value={"Everything"}>Clear Everything</LCDButton>
		</Modal>
	);
};

export { PatternClearModal };
