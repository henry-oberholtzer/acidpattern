import { createGlobalStyle } from 'styled-components';
import InterMedium from '../fonts/InterMedium.ttf';
import OptiAggie from '../fonts/OPTIAggie.otf';

const GlobalStyleProvider = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Inter';
  }
  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
  }
  @font-face {
    font-family: 'Inter';
    font-style: Normal;
    src: url(${InterMedium}) format("truetype");
  }
  @font-face {
    font-family: 'Aggie Solid';
    font-style: Normal;
    src: url(${OptiAggie}) format("opentype");
  }
`;

export { GlobalStyleProvider }
