import { IsNotEmpty } from 'class-validator';

export class Store {
  @IsNotEmpty()
  link: string;
  @IsNotEmpty()
  result: string;
  userId: number;
}
