import { Messages } from '../messages/messages';
import { Place } from '../models/place';
import { State } from '../models/state.enum';
import { Step } from '../models/step';
import { StepObject } from '../models/step-object';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-place',
  templateUrl: './register-place.component.html',
  styleUrls: ['./register-place.component.sass']
})
export class RegisterPlaceComponent implements OnInit {
  shapePath: any = '../assets/imgs/reg-place/step-shape.png';
  stepRoundActiv: any = '../assets/imgs/reg-place/step-round-activ.png';
  stepRoundInactiv: any = '../assets/imgs/reg-place/step-round-inactiv.png';
  place: Place;
  steps: Step[];
  activStep = 3; // TODO in production = 1

  constructor(public msg: Messages) {
    this.place = new Place();
    this.steps = [
      new Step(1, State.Activ),
      new Step(2),
      new Step(3),
      new Step(4),
      new Step(5),
      new Step(6),
      new Step(7),
    ];
  }

  ngOnInit() {
  }

  isStatusActiv(stepStatus: State) {
    return (stepStatus === State.Activ);
  }

  isStatusPased(stepStatus: State) {
    return (stepStatus === State.Pased);
  }

  stateInactiv(stepObject: StepObject) {
    this.place = stepObject.place;
    this.steps[stepObject.index - 1].status = State.Inactiv;
    this.stateActiv(stepObject.index - 2);
  }

  stateActiv(stepIndex: number) {
    this.steps[stepIndex].status = State.Activ;
    this.activStep = stepIndex + 1;
  }

  statePased(stepObject: StepObject) {
    console.log(stepObject.place);
    this.place = stepObject.place;
    this.steps[stepObject.index - 1].status = State.Pased;
    this.stateActiv(stepObject.index);
  }

  doSend() {
    // TODO PlaceService send
  }
}
