export interface SignInInput {
  email: string;
  password: string;
}

export interface SignUpInput {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
  terms: boolean;
}
