import { IUser } from './user.interface';

export interface IServiceUserCreateResponse {
  status: number;
  message: string;
  user: IUser | null;
  token: string | null;
  errors: { [key: string]: any };
}
