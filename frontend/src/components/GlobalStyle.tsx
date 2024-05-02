import { createGlobalStyle } from 'styled-components';
import InterMedium from '../fonts/InterMedium.ttf';
import OptiAggie from '../fonts/OPTIAggie.otf';
import Androcles from '../fonts/AndroclesOpti-Regular.otf';
import LCDFont from '../fonts/LCDFont.woff'
import { Pallete303 } from './303Components/Palette';

const GlobalStyleProvider = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Inter';
    background-color: ${Pallete303.Black}
  }
  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
  }
  @font-face {
    font-family: 'Androcles';
    font-style: Normal;
    src: url(${Androcles}) format("opentype");
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
  @font-face {
    font-family: '5x7 Pixel';
    font-style: Normal;
    src: url(${LCDFont});
  }
`;

export { GlobalStyleProvider }
