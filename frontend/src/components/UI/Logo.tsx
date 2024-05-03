import styled from "styled-components"
import { Link } from "react-router-dom"
import { Pallete303 } from "../303Components/Palette"

const H1 = styled.h1`
font-size: 40px;
font-family: 'Aggie Solid';
margin: 0;
height: 40px;
text-decoration: none;
transition: text-shadow 200ms ease;
a {
  color: ${Pallete303.Black};
  position: relative;
  top: -12px;
  text-decoration: none;
}`

const Logo = () => {
  return (
      <H1><Link to="/">acidpattern.com</Link></H1>
  )
}

export { Logo }
