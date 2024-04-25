import { useAuth } from "../hooks/useAuth";
import { NavigationButton } from "./UI";
import styled from "styled-components";
import { Pallete303 } from "./303Components/Palette";

const UserWidgetDiv = styled.section`
  width: 200px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid ${Pallete303.CaseSilver};
  border-radius: 5px;
  padding: 10px;`

const Username = styled.p`
  color: ${Pallete303.CaseSilver};
  margin: 0;`

const UserWidget = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <UserWidgetDiv>
        <Username>{user.user.username}</Username>
        <NavigationButton
          to={"/logout"}
          text={"logout"}
        />
      </ UserWidgetDiv>
    )
  } else
  {
  return (
    <UserWidgetDiv> 
      <NavigationButton
        to={"/login"}
        text={"login"}
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
