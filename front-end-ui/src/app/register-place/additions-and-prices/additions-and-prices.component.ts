import { Messages } from '../../messages/messages';
import { Place } from '../../models/place';
import { StepObject } from '../../models/step-object';
import { SetIsNotEmptyValidator } from '../../validators/set-is-not-empty-validator';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-additions-and-prices',
  templateUrl: './additions-and-prices.component.html',
  styleUrls: ['./additions-and-prices.component.sass']
})
export class AdditionsAndPricesComponent implements OnInit {
blockTitleImd: any = '../../assets/imgs/reg-place/block-title-img.png';
  selectIconImg: any = '../../assets/imgs/reg-place/filters/select-icon.png';
  iconPath = '../../assets/imgs/reg-place/additions/';
  private id = 6;
  @Output() goNext: EventEmitter<StepObject>;
  @Output() goBack: EventEmitter<StepObject>;
  @Input() place: Place;
  public additionsForm: FormGroup;
  public zoom: number;
  public isSubmited = false;
  public autocompliteResults: object[];
  public curShow = '';
  constructor(public msgs: Messages) {
    this.goNext = new EventEmitter();
    this.goBack = new EventEmitter();
  }

  ngOnInit() {
     this.createForm();
  }

  private createForm() {
    const additions =  this.place.additions;
    this.additionsForm = new FormGroup({
      aditional: new FormControl(additions.aditional, [
        Validators.required, SetIsNotEmptyValidator.isNotEmpty
      ]),
      aditionalReserv: new FormControl(additions.aditionalReserv, [
        Validators.required, SetIsNotEmptyValidator.isNotEmpty
      ])
    });
  }

  onSubmit() {
    if (this.additionsForm.valid) {
      this.place.additions = this.additionsForm.value;
      this.additionsForm.reset();
      this.goNext.emit(new StepObject(this.id, this.place));
    } else {
      this.isSubmited = true;
    }
  }

  onCancel() {
    this.additionsForm.reset({
      aditional: new Set(),
      aditionalReserv: new Set(),
    });
    this.place.additions = this.additionsForm.value;
  }

  onGoBack() {
    this.place.additions = this.additionsForm.value;
    this.additionsForm.reset();
    this.goBack.emit(new StepObject(this.id, this.place));
  }

  addRemoveItem(item: any, name: string): void {
    if (this.isSelected(item, name)) {
      this[name].value.delete(item);
    } else {
       this[name].value.add(item);
    }

     this.additionsForm.reset({
      aditional: this.aditional.value,
      aditionalReserv: this.aditionalReserv.value
    });
  }

  isSelected(item: any, name: string): boolean {
    return this[name].value.has(item);
  }

  setShow(name: string): void {
    this.curShow = name;
  }

  show(name: string): boolean {
    return this.curShow === name;
  }

  closes(name: string): void {
   if (this.show(name)) {
      this.curShow = '';
   }
  }

  get aditional() { return this.additionsForm.get('aditional'); }
  get aditionalReserv() { return this.additionsForm.get('aditionalReserv'); }
}
