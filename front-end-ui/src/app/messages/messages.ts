import { FooterMessages } from './footer-messages';
import { NavBarMessages } from './nav-bar-messages';
import { RegistrePlaceMessages } from './registre-place-messages';
import { Injectable } from '@angular/core';

@Injectable()
export class Messages {
  navBarMessages: NavBarMessages;
  footerMessages: FooterMessages;
  registrePlaceMessages: RegistrePlaceMessages;
}
