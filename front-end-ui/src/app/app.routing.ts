import { AdditionsAndPricesComponent } from './register-place/additions-and-prices/additions-and-prices.component';
import { ContactDataComponent } from './register-place/contact-data/contact-data.component';
import { FiltersComponent } from './register-place/filters/filters.component';
import { FinalComponent } from './register-place/final/final.component';
import { LocationInfoComponent } from './register-place/location-info/location-info.component';
import { PhotosComponent } from './register-place/photos/photos.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPlaceComponent } from './register-place/register-place.component';
import { WorkingHoursComponent } from './register-place/working-hours/working-hours.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/register/place', // TODO: security
    pathMatch: 'full'
  },
  {
    path: 'register/place',
    component: RegisterPlaceComponent
  },
  {
    path: '**',
    redirectTo: '/register/place',
    pathMatch: 'full'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
