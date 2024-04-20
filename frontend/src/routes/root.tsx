import { useState } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const Root = () => {
  const [user, setUser] = useState<AuthorizedUser | null >(null)

  return (
    <>    
      <Header/>
      <p>This is a skeleton root component.</p>
      {user?.user ? <span>Current user: {user.user.username}</span> : <></>}
      <Outlet context={{user: user, setUser: setUser} satisfies UserContext} />
    </>

  )
}

export { Root }
