import { CowSex } from './cow-sex.enum';

export interface Cow {
  id: string;
  sex: CowSex;
  pen: string;
  status: string;
  lastEventDate: string;
  weight?: number;
  events?: [];
}
