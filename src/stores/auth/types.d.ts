/* eslint-disable no-unused-vars */
interface IAuthState {
  auth: TDefaultAuth | null;
  login: (auth: TDefaultAuth) => void;
  logout: () => void;
}

type TDefaultAuth = {
  user: {
    name: string;
  };
  accessToken: string;
};
