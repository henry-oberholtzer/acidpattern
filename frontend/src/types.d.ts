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
  confirmPassword: string;
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

interface User {
  username: string;
  id: int;
  profile: Profile;
}

interface UserContext {
  user?: null;
  setUser?: React.Dispatch
}
