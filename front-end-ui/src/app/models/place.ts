import { ContactData } from './contact-data';
import { LocationInfo } from './locationinfo';
import { WorkingHours } from './working-hours';
import { Injectable } from '@angular/core';

export class Place {
  id: number;
  locationInfo: LocationInfo = new LocationInfo();
  workingHours: WorkingHours =  new WorkingHours();
  contData: ContactData = new ContactData();
}
