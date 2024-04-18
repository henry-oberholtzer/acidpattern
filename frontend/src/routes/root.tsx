import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <Header/>
      <p>This is a skeleton root component.</p>
      <Outlet/>
    </>
  )
}
