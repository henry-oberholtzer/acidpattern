import { createGlobalStyle } from 'styled-components';
import InterMedium from '../fonts/InterMedium.ttf'

const GlobalStyleProvider = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  @font-face {
    font-family: 'Inter';
    font-style: Normal;
    src: url(${InterMedium}) format("truetype");
  }
`;

export { GlobalStyleProvider }
