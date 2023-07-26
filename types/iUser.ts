import { IGame } from './iGame';
import { IPreparation } from './iPreparation';

export interface IUser {
  id: number;
  name: string;
  studentId: number;
  role: string;
  games: IGame[];
  preparations: IPreparation[];
}
