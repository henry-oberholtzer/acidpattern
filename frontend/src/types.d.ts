interface PageJSON {
  count: number;
  next: number | null;
  previous: number | null;
  results: []
}

interface RegisterUser extends FormData {
  username: string;
  password: string;
  email: string;
  confirmPassword?: string;
}

interface RegisterErrors {
  username?: string;
  password?: string;
  email?: string;
  confirmPassword?: string;
}

interface Profile {
  profile_pic: string;
  bio: string;
}

interface AuthorizedUser {
  user: User
  token: string;
}

interface LogIn extends FormData {
  username: string;
  password: string;
}

interface User {
  username: string;
  id: int;
  profile: Profile;
}

type UserContext = {
  user: AuthorizedUser | null;
  setUser: React.Dispatch
}
