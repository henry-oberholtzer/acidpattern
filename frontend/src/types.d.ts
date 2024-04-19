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
