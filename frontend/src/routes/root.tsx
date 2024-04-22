import { GlobalStyleProvider } from "../components/GlobalStyle";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const Root = () => {

  return (
    <>
      <GlobalStyleProvider />
      <Header/>
      <Outlet />
    </>

  )
}

export { Root }
