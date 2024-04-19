import { useState } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import React from "react";

export const UserContext = React.createContext<UserContext>({})

export default function Root() {
  const [user, setUser] = useState(null)


  return (
    <UserContext.Provider value={{ user: user, setUser: setUser}}>
      <Header/>
      <p>This is a skeleton root component.</p>
      <Outlet/>
    </UserContext.Provider>
  )
}
