import styled from "styled-components";
import { Pallete303 } from "../303Components/Palette";

const DisplayTitle = styled.h2<{ $size?: "sm" | "md"}>`
  font-size: ${props => props.$size === "sm" ? "20px" : props.$size === "md" ? "24px" : "32px" };
  font-family: 'Aggie Solid';
  text-transform: lowercase;
  margin: 0px 0px 20px 0px;
  color: ${Pallete303.Black};`

export { DisplayTitle }
