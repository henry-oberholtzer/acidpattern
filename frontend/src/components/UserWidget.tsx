import { useAuth } from "../hooks/useAuth";
import { NavigationButton } from "./UI";
import styled from "styled-components";

const UserWidgetDiv = styled.section`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: right;
  border-radius: 5px;`

const UserWidget = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <UserWidgetDiv>
        <NavigationButton
          to={"/profile"}
          text={user.user.username}
        />
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
