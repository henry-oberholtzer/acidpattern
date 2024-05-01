import { PropsWithChildren,  createContext, useContext, useEffect, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";

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

  useEffect(() => {
    if (user != null && Date.parse(user.expiry) < Date.now()) {
      setUser(null)
    }
  }, [user, setUser])

  const value = useMemo(
    () => ({
      user,
      login: async (data: AuthorizedUser) => {
        setUser(data);
      },
      logout: () => {
        setUser(null);
      },
    }),
    [user, setUser]
  );
  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}

const useAuth = () => {
  return useContext(AuthContext)
}

export { useAuth, AuthProvider }
