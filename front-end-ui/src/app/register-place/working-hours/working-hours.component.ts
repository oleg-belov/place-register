import { Messages } from '../../messages/messages';
import { Place } from '../../models/place';
import { StepObject } from '../../models/step-object';
import { Component, OnInit, ElementRef, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.component.html',
  styleUrls: ['./working-hours.component.sass']
})
export class WorkingHoursComponent implements OnInit {
  blockTitleImd: any = '../../assets/imgs/reg-place/block-title-img.png';
  private id = 2;
  isAutocomplite = false;
  @Output() goNext: EventEmitter<StepObject>;
  @Output() goBack: EventEmitter<StepObject>;
  @Input() place: Place;
  parentSubject: Subject<string>;
  formState: boolean[] = [];

  constructor(public msgs: Messages) {
    this.goNext = new EventEmitter();
    this.goBack = new EventEmitter();
    this.parentSubject = new Subject();
  }

  ngOnInit(): void {
    this.msgs.registrePlaceMessages.workingHoursMessages.days
      .sort((a, b) => a.id - b.id);
  }

  onDataChanged(dayControl: FormGroup): void {
    const dayId = dayControl.get('id').value - 1;
    this.place.workingHours.days[dayId] = dayControl.value;
    this.formState[dayId] = dayControl.valid;
  }

  isValidForm(): boolean {
    for (const dayState of this.formState) {
      if (!dayState) {
        return false;
      }
    }

    return this.formState.length === 7;
  }

  onSubmit(): void {
    if (this.isValidForm()) {
      this.parentSubject.next('submit');
      this.goNext.emit(new StepObject(this.id, this.place));
    } else {
      this.parentSubject.next('submitInv');
    }
  }

  onGoBack(): void {
    this.goBack.emit(new StepObject(this.id, this.place));
    this.parentSubject.next('goback');
  }

  onCancel(): void {
    this.place.workingHours.days = [];
    this.parentSubject.next('cancel');
  }
}
