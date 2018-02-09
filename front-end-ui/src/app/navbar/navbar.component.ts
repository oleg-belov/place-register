import { Messages } from '../messages/messages';
import { UserDetails } from '../models/user-details';
import { MessageService } from '../services/message.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {
  logoPath: any = '../assets/imgs/nav/logo.png';
  avatarPath: any = '../assets/imgs/nav/avatar.png';
  logOutIconPath: any = '../assets/imgs/nav/logOutIcon.png';
  navDropdownIconPath = '/assets/imgs/nav/navDropdownIcon.png';

  constructor(public messages: Messages,
    public userDetails: UserDetails,
    private messageService: MessageService
  ) { }

  onChangeLanguage(selectedLang: string) {
    this.messageService.doChangeLang(selectedLang);
  }

  onLogOut() {
     // TODO:serviceLogOut;
  }

  onLogIn() {
     // TODO:serviceLogOut;
  }

  // TODO: select lang
}
