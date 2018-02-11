import { DayMessageMessage } from '../../../messages/day-message';
import { Messages } from '../../../messages/messages';
import { Day } from '../../../models/day';
import { WeekDayValidator } from '../../../validators/week-day-validator';
import { Component, OnInit, Input, EventEmitter, Output, OnDestroy, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-working-day',
  templateUrl: './working-day.component.html',
  styleUrls: ['./working-day.component.sass']
})
export class WorkingDayComponent implements OnInit, OnDestroy {
  dashImd: any = '../../assets/imgs/reg-place/working-hours/dash.png';
  @Output() changed: EventEmitter<FormGroup>;
  @Input() day: DayMessageMessage;
  @Input() days: Day[];
  @Input() parentSubject: Subject<string>;
  public dayForm: FormGroup;
  isSubmited = false;
  constructor(public msgs: Messages) {
    this.changed = new EventEmitter();
  }

  ngOnInit(): void {
    this.createForm();
    this.changed.emit(this.dayForm);
    this.onChanges();
    this.parentSubject.subscribe(event => {
      switch (event) {
        case 'submit' :
          this.dayForm.reset();
          break;
        case 'submitInv' :
          this.isSubmited = true;
          break;
        case 'goback' :
          this.dayForm.reset();
          break;
        case 'cancel' :
          this.dayForm.reset({
            id: this.day.id
          });
      }
    });
  }

  ngOnDestroy(): void {
    // this.parentSubject.unsubscribe();
  }

  onChanges(): void {
    this.dayForm.valueChanges.subscribe(val => {
      this.changed.emit(this.dayForm);
    });
  }

  onClickButon(event: string) {
    switch (event) {
      case 'open' :
        this.dayForm.reset({
            id: this.day.id,
            openFrom: this.openFrom.value,
            openTo: this.openTo.value
        });
        break;
      case 'close' :
        this.dayForm.reset({
            id: this.day.id,
            isClosed: true
        });
        break;
      case 'open-only' :
        this.dayForm.reset({
            id: this.day.id,
            is24to24: true
        });
    }
  }

  private createForm(): void {
    const dayData =  this.days[this.day.id - 1] ?
      this.days[this.day.id - 1] :
      new Day();

    this.dayForm = new FormGroup({
      id: new FormControl(this.day.id, Validators.required),
      openFrom: new FormControl(dayData.openFrom || null),
      openTo: new FormControl(dayData.openTo || null),
      isClosed: new FormControl(dayData.isClosed),
      is24to24: new FormControl(dayData.is24to24)
    },
      Validators.compose([WeekDayValidator.required, WeekDayValidator.invalidFormat, WeekDayValidator.invalidRange])
    );
  }

  get id() { return this.dayForm.get('id'); }
  get openFrom() { return this.dayForm.get('openFrom'); }
  get openTo() { return this.dayForm.get('openTo'); }
  get isClosed() { return this.dayForm.get('isClosed'); }
  get is24to24() { return this.dayForm.get('is24to24'); }
}
