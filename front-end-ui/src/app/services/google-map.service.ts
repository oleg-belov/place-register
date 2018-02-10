import { Marker } from '../models/marker';
import { MarkerWithDetails } from '../models/marker-with-details';
import { PlaceResult } from '../models/place-result';
import { Injectable } from '@angular/core';

@Injectable()
export class GoogleMapService {
  private latitude: number;
  private longitude: number;
  private zoom: number;

  constructor() { }

  public getCurrentPosition(): Marker {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 5;
      });
    }

    return this.getMarker();
  }

  public parsePlaceResultToMArker(placeRs: PlaceResult): Marker {
    const marker = new MarkerWithDetails();

    marker.setLatitude(placeRs.geometry.location.lat());
    marker.setLongitude(placeRs.geometry.location.lng());
    const addrComponents = placeRs.address_components;
    marker.setCountry(
      this.getMatchesFromAddrComp(addrComponents, 'country'));
    marker.setLocality(
      this.getMatchesFromAddrComp(addrComponents, 'locality'));
    marker.setStreet(
      this.getMatchesFromAddrComp(addrComponents, 'route'));
    marker.setCountryShort(
      this.getCountryShortFromAddrComp(addrComponents));

    return marker;
  }

  private getMarker(): Marker {
    const newMarker = new Marker();
    newMarker.setLatitude(this.latitude);
    newMarker.setLongitude(this.longitude);
    newMarker.setZoom(this.zoom);

    this.destructor();

    return newMarker;
  }

  private destructor(): void {
    this.latitude = null;
    this.longitude = null;
    this.zoom = null;
  }

  private getMatchesFromAddrComp(addrComponents: any, matcher: string): string {
    let result = '';

    for (const addrComponent of addrComponents) {
      if (addrComponent.types[0] === matcher) {
        result = addrComponent.long_name;
        break;
      }
    }

    return result;
  }

  private getCountryShortFromAddrComp(addrComponents): string {
    let result = '';

    for (const addrComponent of addrComponents) {
      if (addrComponent.types[0] === 'country') {
        result = addrComponent.short_name;
        break;
      }
    }

    return result;
  }
}
