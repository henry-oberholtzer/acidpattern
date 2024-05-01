import { useAuth } from "../hooks/useAuth";
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

const UserWidget = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <UserWidgetDiv>
        <p>{user.user.username}</p>
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
