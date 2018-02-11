import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { FooterComponent } from './footer/footer.component';
import { Messages } from './messages/messages';
import { UserDetails } from './models/user-details';
import { NavbarComponent } from './navbar/navbar.component';
import { MessageService } from './services/message.service';
import { HttpClientModule } from '@angular/common/http';
import { RegisterPlaceComponent } from './register-place/register-place.component';
import { AdditionsAndPricesComponent } from './register-place/additions-and-prices/additions-and-prices.component';
import { ContactDataComponent } from './register-place/contact-data/contact-data.component';
import { FiltersComponent } from './register-place/filters/filters.component';
import { FinalComponent } from './register-place/final/final.component';
import { LocationInfoComponent } from './register-place/location-info/location-info.component';
import { PhotosComponent } from './register-place/photos/photos.component';
import { WorkingHoursComponent } from './register-place/working-hours/working-hours.component';
import { GoogleMapService } from './services/google-map.service';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InputMaskModule} from 'primeng/components/inputmask/inputmask';
import { WorkingDayComponent } from './register-place/working-hours/working-day/working-day.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RegisterPlaceComponent,
    AdditionsAndPricesComponent,
    ContactDataComponent,
    FiltersComponent,
    FinalComponent,
    LocationInfoComponent,
    PhotosComponent,
    WorkingHoursComponent,
    WorkingDayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDT0WaANhOKDfHzdobpRTqXScBuvt05ZfY', libraries: ['places']}),
    InputMaskModule
  ],
  providers: [
    Messages,
    UserDetails,
    MessageService,
    GoogleMapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
