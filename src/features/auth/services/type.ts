export type loginRequestType = {
  email: string;
  password: string;
};

export type logoutRequestType = {
  refreshToken: string;
};

export type LoginResponseType = {
  token: string;
  user: { id: string; name: string };
};
export type LogoutResponseType = { success: boolean; message: string };
