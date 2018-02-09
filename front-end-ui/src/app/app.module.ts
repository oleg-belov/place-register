import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { Messages } from './messages/messages';
import { UserDetails } from './models/user-details';
import { NavbarComponent } from './navbar/navbar.component';
import { MessageService } from './services/message.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    Messages,
    UserDetails,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
