import { ContactData } from './contact-data';
import { LocationInfo } from './locationinfo';
import { Injectable } from '@angular/core';

export class Place {
  id: number;
  locationInfo: LocationInfo = new LocationInfo();
  contData: ContactData = new ContactData();
}
