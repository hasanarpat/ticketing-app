export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type AuthResult = {
  userId: string;
  role: string;
  permissions: string[];
  accessToken: string;
  cookieHeader: string;
};
