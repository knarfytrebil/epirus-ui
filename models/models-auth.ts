export interface IUserProfile {
  acr: string;
  auth_time: number;
  azp: string;
  email: string;
  email_verified: false;
  family_name: string;
  given_name: string;
  jti: string;
  name: string;
  preferred_username: string;
  s_hash: string;
  session_state: string;
  sub: string;
  typ: string;
}

export interface IUser {
  profile: IUserProfile;
  id_token: string;
  expires_in: number;
  access_token: string;
  expires_at: string;
  refresh_token: string;
  scope: string;
  session_state: string;
  state: string;
  token_type: string;
}
