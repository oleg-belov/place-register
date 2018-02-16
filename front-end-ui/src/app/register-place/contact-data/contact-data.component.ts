import { Messages } from '../../messages/messages';
import { Marker } from '../../models/marker';
import { MarkerWithDetails } from '../../models/marker-with-details';
import { Place } from '../../models/place';
import { PlaceResult } from '../../models/place-result';
import { StepObject } from '../../models/step-object';
import { GoogleMapService } from '../../services/google-map.service';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Component, OnInit, ViewChild, ElementRef, NgZone,  EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.sass']
})
export class ContactDataComponent implements OnInit {
  // TODO: fix with z-index dropdown autocomplet

  // TODO: autocomplete when click at map or drag end,
  // google return lat and lon, need throw serwice that return addres by coord.
  // get near service works wrong, return adreses at diferent countries...
  blockTitleImd: any = '../../assets/imgs/reg-place/block-title-img.png';
  public markerImg: any = '../../assets/imgs/reg-place/contact-data/marker-img.png';
  private id = 3;
  @Output() goNext: EventEmitter<StepObject>;
  @Input() place: Place;
  public contDataForm: FormGroup;
  public zoom: number;
  public isAutocomplite = false;
  public isSubmited = false;
  public autocompliteResults: object[];
  private isMouseOverAutocomplete = false;
  @ViewChild('map')
  public mapElementRef: ElementRef;

  constructor(
    public msgs: Messages,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private gMapService: GoogleMapService,
  ) {
    this.goNext = new EventEmitter();
  }

  ngOnInit() {
    this.createForm();
    this.autocompliteResults = [];
    this.setCurentPosition(
      this.place.contData.longitude === null
        || this.place.contData.latitude === null ?
          this.gMapService.getCurrentPosition() :
          new Marker(this.place.contData.latitude, this.place.contData.longitude)
      );

    this.mapsAPILoader.load();
//      .then(() => {
//      const autocomplete = new google.maps.places.Autocomplete(this.mapElementRef.nativeElement, {
//        types: ['address']
//      });
//      autocomplete.addListener('place_changed', () => {
//        this.ngZone.run(() => {
//          const place: PlaceResult = autocomplete.getPlace();
//
//          if (place.geometry === undefined || place.geometry === null) {
//            return;
//          }
//
//          this.setCurentPosition(
//            this.gMapService.parsePlaceResultToMArker(place));
//        });
//      });
//    });
  }

  onMapZoom($event) {
    this.zoom = parseInt($event, 10);
  }

  onMarkerClick($event: MouseEvent) {
    console.log('clicked the marker:', $event);
  }

  onMarkerDragEnd($event: MouseEvent) {
    console.log('dragEnd', $event);
    this.setCurentPosition(new Marker($event.coords.lat, $event.coords.lng));
  }

  onMapClicked($event: MouseEvent) {
    console.log('clickedMap', $event);
    this.setCurentPosition(new Marker($event.coords.lat, $event.coords.lng));
  }

  onSubmit() {
    if (this.contDataForm.valid) {
      this.place.contData = this.contDataForm.value;
      this.contDataForm.reset();
      this.isSubmited = true;
      this.goNext.emit(new StepObject(this.id, this.place));
    } else {
      this.isSubmited = true;
    }
  }

  onCancel() {
    this.contDataForm.reset();
    this.place.contData = this.contDataForm.value;
  }

  enableAutocomplet($event?: any) {
    if (this.street.value) {
      const inpt = `${this.country.value}, ${this.city.value}, ${this.street.value}`;
      this.isAutocomplite = true;
      const autocompliteService = new google.maps.places.AutocompleteService();
      autocompliteService.getPlacePredictions({input: inpt, types: ['address']},
        (result, status) => {
          this.autocompliteResults = result.map(place => {
            return {
              address: place.description,
              id: place.place_id
            };
          });
        });
    }
  }

  disableAutocomplet() {
    if (!this.isMouseOverAutocomplete) {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.ngZone.run(() => {
            this.isAutocomplite = false;
          });
        }, 500);
      });
    }
  }

  onMouseover() {
    this.isMouseOverAutocomplete = true;
  }

  onMouseout() {
    this.isMouseOverAutocomplete = false;
  }

  autocomplitePlaceCliced(id: string): void {
    this.isMouseOverAutocomplete = false;
    this.isAutocomplite = false;
    const placeService = new google.maps.places.PlacesService(this.mapElementRef.nativeElement);
    placeService.getDetails({placeId: id},
        (result: PlaceResult, status) => {
          this.setCurentPosition(this.gMapService.parsePlaceResultToMArker(result));
        });
  }

  private setCurentPosition(marker): void {
    this.contDataForm.patchValue({
      latitude:    marker.getLatitude() || 0,
      longitude: marker.getLongitude() || 0
    });
    this.zoom = marker.getZoom() || this.zoom || 16;
    if (marker instanceof MarkerWithDetails) {
      this.contDataForm.patchValue({
        country:    marker.getCountry() || '',
        city: marker.getLocality() || '',
        street: marker.getStreet() || ''
      });
    }
  }

  private createForm() {
    const contData =  this.place.contData;

    this.contDataForm = new FormGroup({
      firstName: new FormControl(contData.firstName, [
          Validators.required, Validators.maxLength(50)
        ]),
      lastName: new FormControl(contData.lastName, [
          Validators.required, Validators.maxLength(50)
        ]),
      phoneNumber: new FormControl(contData.phoneNumber, [
          Validators.required, Validators.maxLength(50)
        ]),
      country: new FormControl(contData.country, [
          Validators.required, Validators.maxLength(50)
        ]),
      city: new FormControl(contData.city, [
          Validators.required, Validators.maxLength(50)
        ]),
      street: new FormControl(contData.street, [
          Validators.required, Validators.maxLength(50)
        ]),
      postCode: new FormControl(contData.postCode, [
          Validators.required, Validators.maxLength(50)
        ]),
      latitude: new FormControl(contData.latitude, Validators.required),
      longitude: new FormControl(contData.longitude, Validators.required)
    });
  }

  get firstName() { return this.contDataForm.get('firstName'); }
  get lastName() { return this.contDataForm.get('lastName'); }
  get phoneNumber() { return this.contDataForm.get('phoneNumber'); }
  get country() { return this.contDataForm.get('country'); }
  get city() { return this.contDataForm.get('city'); }
  get street() { return this.contDataForm.get('street'); }
  get postCode() { return this.contDataForm.get('postCode'); }
  get latitude() { return this.contDataForm.get('latitude'); }
  get longitude() { return this.contDataForm.get('longitude'); }
}
