import { IUser } from './iUser';

export interface IGame {
  id: number;
  link: string;
  result: 'Won' | 'Lost' | 'Draw';
  review: boolean;
  userId: number;
  user?: IUser;
}
