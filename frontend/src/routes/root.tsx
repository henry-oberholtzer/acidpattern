import styled from "styled-components";
import { GlobalStyleProvider } from "../components/GlobalStyle";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const CenterFrame = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  flex-direction: column;`

const Root = () => {

  return (
    <>
      <GlobalStyleProvider />
      <Header/>
      <CenterFrame> 
      <Outlet />
      </CenterFrame>
    </>

  )
}

export { Root }
