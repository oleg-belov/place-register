import { Place } from './place';

export class StepObject {
  index: number;
  place: Place;

  constructor(index: number, place: Place) {
    this.index = index;
    this.place = place;
  }
}
