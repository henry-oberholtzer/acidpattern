import styled from "styled-components";
import { Pallete303 } from "../303Components/Palette";

const ErrorField = styled.p<{ $active?: boolean }>`
  height: 20px;
  font-size: 16px;
  font-weight: bold;
  color: ${Pallete303.LEDRedActive};`

export { ErrorField }
