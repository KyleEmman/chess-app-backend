import { IUser } from './iUser';

export interface IPreparation {
  id: number;
  player: string;
  result: 'Won' | 'Lost' | 'Draw';
  division: 'Men' | 'Women';
  link: string;
  review: boolean;
  userId: number;
  user?: IUser;
}
