import { createGlobalStyle } from 'styled-components';
import InterMedium from '../fonts/InterMedium.ttf';
import OptiAggie from '../fonts/OPTIAggie.otf';
import Androcles from '../fonts/AndroclesOpti-Regular.otf';
import Pixel5x7 from '../fonts/5x7pixel/5x7-pixel-monospace.ttf'

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
    src: url(${Pixel5x7}) format("truetype");
  }
`;

export { GlobalStyleProvider }
