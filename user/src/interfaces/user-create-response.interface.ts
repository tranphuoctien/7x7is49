import { IUser } from './user.interface';

export interface IUserCreateResponse {
  status: number;
  message: string;
  user: IUser | null;
  token: string | null;
  errors: { [key: string]: any } | null;
}
