import { Marker } from './marker';

export class MarkerWithDetails  extends Marker {
  private country: string;
  private locality: string;
  private street: string;
  private countryShort: string;

  constructor() {
    super();
    this.country = '';
    this.locality = '';
    this.street = '';
    this.countryShort = '';
  }

  setCountry(country: string): void {
    this.country = country;
  }

  getCountry(): string {
    return this.country;
  }

  setLocality(locality: string): void {
    this.locality = locality;
  }

  getLocality(): string {
    return this.locality;
  }

  setStreet(street: string): void {
    this.street = street;
  }

  getStreet(): string {
    return this.street;
  }

  setCountryShort(countryShort: string): void {
    this.countryShort = countryShort;
  }

  getCountryShort(): string {
    return this.countryShort;
  }
}
