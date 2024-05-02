import { useAuth } from "../hooks/useAuth";
import { Pallete303 } from "./303Components/Palette";
import { NavigationButton } from "./UI";
import styled from "styled-components";

const UserWidgetDiv = styled.section`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: right;
  border-radius: 5px;`

const LCDReadout = styled.div`
font-family: '5x7 Pixel';
font-size: 14px;
height: 36px;
margin: 0;
display: flex;
align-items: center;
padding: 0px 4px 0px 4px;
text-rendering: geometricPrecision;
color: ${Pallete303.LCDFont};
border-top: 3px solid ${Pallete303.CaseShadow};
border-bottom: 3px solid ${Pallete303.CaseHighlight};
border-left: 3px solid ${Pallete303.ButtonRight};
border-right: 3px solid ${Pallete303.ButtonLeft};
background-color: ${Pallete303.LCDBackground};`

const UserWidget = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <UserWidgetDiv>
        <LCDReadout><p>{user.user.username}</p></LCDReadout>
        <NavigationButton
          to={"/profile"}
          text={"profile"}
        />
      </ UserWidgetDiv>
    )
  } else
  {
  return (
    <UserWidgetDiv> 
      <NavigationButton
        to={"/login"}
        text={"log in"}
      />
      <NavigationButton
        to={"/register"}
        text={"register"}
      />
    </UserWidgetDiv>
    )
  }
}

export { UserWidget }
