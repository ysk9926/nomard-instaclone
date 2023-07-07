export interface IAccount {
  id: number;
  userName: string;
  email: string;
  password: string;
  avatarURL: String;
  githubUsername: string;
}

export interface IJwt {
  id: number;
}

export interface IUser {
  id: number;
  userName: string;
  email: string;
  password: string;
  avatarurl: string;
  gitHubUsername: string;
  createdAt: any;
  updatedAt: any;
}

export interface IContext {
  loggedInUser: IUser | null;
}

export interface IError {
  ok: boolean;
  error: string;
}
