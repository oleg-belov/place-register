import { Messages } from '../../messages/messages';
import { Place } from '../../models/place';
import { StepObject } from '../../models/step-object';
import { Component, OnInit, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup,  FormControl, Validators  } from '@angular/forms';

@Component({
  selector: 'app-location-info',
  templateUrl: './location-info.component.html',
  styleUrls: ['./location-info.component.sass']
})
export class LocationInfoComponent implements OnInit {
  blockTitleImd: any = '../../assets/block-title-img.png';
  private id = 1;
  isAutocomplite = false;
  @Output() goNext: EventEmitter<StepObject>;
  @Input() place: Place;
  locationInfoForm: FormGroup;

  constructor(public msgs: Messages) {
    this.goNext = new EventEmitter();
  }

  ngOnInit() {
     this.createForm();
  }

  private createForm() {
    const locationInfo =  this.place.locationInfo;

    this.locationInfoForm = new FormGroup({
      juridicName: new FormControl(locationInfo.juridicName, Validators.required),
      comercialName: new FormControl(locationInfo.comercialName, [
        Validators.required, Validators.maxLength(50)
      ]),
      category: new FormControl(locationInfo.category, [
        Validators.required, Validators.maxLength(50)
      ]),
      descriptionRo: new FormControl(locationInfo.descriptionRo, [
        Validators.required, Validators.maxLength(250)
      ]),
      discount: new FormControl(locationInfo.discount, [
        Validators.required, Validators.max(100), Validators.min(7),
        Validators.pattern('[0-9]{1,}')
      ]),
      isBroningAvalible: new FormControl(locationInfo.isBroningAvalible, Validators.required),
      averageComandPriceRange: new FormControl(locationInfo.averageComandPriceRange, [
        Validators.required, Validators.maxLength(50)
      ]),
      descriptionRu: new FormControl(locationInfo.descriptionRu, [
        Validators.required, Validators.maxLength(250)
      ])
    });
  }

  onSubmit() {
    if (this.locationInfoForm.valid) {
      this.isAutocomplite = false;
      this.place.locationInfo = this.locationInfoForm.value;
      this.locationInfoForm.reset();
      this.goNext.emit(new StepObject(this.id, this.place));
    } else {
      this.isAutocomplite = true;
    }
  }

  onCancel() {
    this.locationInfoForm.reset({
      juridicName: this.place.locationInfo.juridicName,
      isBroningAvalible: false
    });
    this.place.locationInfo = this.locationInfoForm.value;
  }

  get juridicName() { return this.locationInfoForm.get('juridicName'); }
  get comercialName() { return this.locationInfoForm.get('comercialName'); }
  get category() { return this.locationInfoForm.get('category'); }
  get descriptionRo() { return this.locationInfoForm.get('descriptionRo'); }
  get discount() { return this.locationInfoForm.get('discount'); }
  get isBroningAvalible() { return this.locationInfoForm.get('isBroningAvalible'); }
  get averageComandPriceRange() { return this.locationInfoForm.get('averageComandPriceRange'); }
  get descriptionRu() { return this.locationInfoForm.get('descriptionRu'); }
}
