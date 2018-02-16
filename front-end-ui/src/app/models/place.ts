import { ContactData } from './contact-data';
import { Filters } from './filters';
import { LocationInfo } from './locationinfo';
import { Photos } from './photos';
import { WorkingHours } from './working-hours';
import { Injectable } from '@angular/core';

export class Place {
  id: number;
  locationInfo: LocationInfo = new LocationInfo();
  workingHours: WorkingHours =  new WorkingHours();
  contData: ContactData = new ContactData();
  photos: Photos = new Photos();
  filters: Filters = new Filters();
}
