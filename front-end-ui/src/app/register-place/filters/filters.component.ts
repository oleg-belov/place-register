import { Messages } from '../../messages/messages';
import { Place } from '../../models/place';
import { StepObject } from '../../models/step-object';
import { SetIsNotEmptyValidator } from '../../validators/set-is-not-empty-validator';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.sass']
})
export class FiltersComponent implements OnInit {
  blockTitleImd: any = '../../assets/imgs/reg-place/block-title-img.png';
  selectIconImg: any = '../../assets/imgs/reg-place/filters/select-icon.png';
  private id = 5;
  @Output() goNext: EventEmitter<StepObject>;
  @Output() goBack: EventEmitter<StepObject>;
  @Input() place: Place;
  public filtersForm: FormGroup;
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
    const filters =  this.place.filters;
    this.filtersForm = new FormGroup({
      cusines: new FormControl(filters.cusines, [
        Validators.required, SetIsNotEmptyValidator.isNotEmpty
      ]),
      localType: new FormControl(filters.localType, [
        Validators.required, SetIsNotEmptyValidator.isNotEmpty
      ]),
      tableType: new FormControl(filters.tableType, [
        Validators.required, SetIsNotEmptyValidator.isNotEmpty
      ]),
      specialMenu: new FormControl(filters.specialMenu, [
        Validators.required, SetIsNotEmptyValidator.isNotEmpty
      ])
    });
  }

  onSubmit() {
    if (this.filtersForm.valid) {
      this.place.filters = this.filtersForm.value;
      this.filtersForm.reset();
      this.goNext.emit(new StepObject(this.id, this.place));
    } else {
      this.isSubmited = true;
    }
  }

  onCancel() {
    this.filtersForm.reset({
      cusines: new Set(),
      localType: new Set(),
      tableType: new Set(),
      specialMenu: new Set()
    });
    this.place.filters = this.filtersForm.value;
  }

  onGoBack() {
    this.place.filters = this.filtersForm.value;
    this.filtersForm.reset();
    this.goBack.emit(new StepObject(this.id, this.place));
  }

  addRemoveItem(item: any, name: string): void {
    if (this.isSelected(item, name)) {
      this[name].value.delete(item);
    } else {
       this[name].value.add(item);
    }

     this.filtersForm.reset({
      cusines: this.cusines.value,
      localType: this.localType.value,
      tableType: this.tableType.value,
      specialMenu: this.specialMenu.value
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

  get cusines() { return this.filtersForm.get('cusines'); }
  get localType() { return this.filtersForm.get('localType'); }
  get tableType() { return this.filtersForm.get('tableType'); }
  get specialMenu() { return this.filtersForm.get('specialMenu'); }
}
