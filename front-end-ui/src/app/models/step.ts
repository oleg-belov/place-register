import { State } from './state.enum';

export class Step {
  index: number;
  status: State | State.Inactiv;

   constructor(index: number, status?: State) {
     this.index = index;
     this.status = status;
   }
}
