export interface AuthResponseData {
  localId: string;
  email: string;
  idToken: string;
  registered?: boolean;
  refreshToken: string;
  expiresIn: string;
}
