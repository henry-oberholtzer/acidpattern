import styled from "styled-components";
import { GlobalStyleProvider } from "../components/GlobalStyle";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "../components";

const CenterFrame = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  flex-direction: column;`

const ParentFrame = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;`

const Root = () => {

  return (
    <>
    <ParentFrame>
      <GlobalStyleProvider />
      <Header/>
      <CenterFrame> 
      <Outlet />
      </CenterFrame>
      <Footer />
    </ParentFrame>
    </>

  )
}

export { Root }
