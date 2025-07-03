import { Sector } from './sector.model';

export interface User {
  id: number;
  name: string;
  email: string;
  profile: string;
  sector?: Sector;
}
