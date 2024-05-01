import styled from "styled-components";
import { Pallete303 } from "../303Components/Palette";

const ModalFrame = styled.div`
  background-color: ${Pallete303.CaseSilver};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  border: 2px solid ${Pallete303.CaseHighlight};
  border-left: 2px solid ${Pallete303.CaseShadow};
  border-bottom: 2px solid ${Pallete303.CaseShadow};
  padding: 20px;`

export { ModalFrame }
