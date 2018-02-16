import { Messages } from '../../messages/messages';
import { Place } from '../../models/place';
import { StepObject } from '../../models/step-object';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.sass']
})
export class FinalComponent implements OnInit {
  fileImg: any = '../../assets/imgs/reg-place/final/file.png';
  private id = 7;
  @Input() place: Place;
  @Output() doSend: EventEmitter<Place>;
  @Output() goBack: EventEmitter<StepObject>;

  constructor(public msgs: Messages) {
    this.doSend = new EventEmitter();
    this.goBack = new EventEmitter();
  }

  ngOnInit() {
  }

  onGoBack() {
    this.goBack.emit(new StepObject(this.id, this.place));
  }

  onDoSend() {
    this.doSend.emit();
  }
}
