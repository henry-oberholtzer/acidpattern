import { PropsWithChildren,  createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useNavigate } from 'react-router-dom'

export type UserContext = {
  user: AuthorizedUser | null;
  login: (data: AuthorizedUser) => void;
  logout: () => void;
}

const AuthContext = createContext<UserContext>({
  user: null,
  login: () => {},
  logout: () => {}
})

const AuthProvider = (props: PropsWithChildren) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = async (data: AuthorizedUser) => {
    setUser(data);
    navigate("/patterns")
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true})
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}

const useAuth = () => {
  return useContext(AuthContext)
}

export { useAuth, AuthProvider }
