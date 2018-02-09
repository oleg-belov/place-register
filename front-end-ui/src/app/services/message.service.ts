import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Messages } from '../messages/messages';

@Injectable()
export class MessageService {

  constructor(private http: HttpClient, private messages: Messages) { }

  doChangeLang(lang?: string): void {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Basic ' + btoa('info@memorynotfound.com:password'));
    const url = this.getUrl(lang);
    console.log(url);
    this.http.get(url, { headers: headers }).subscribe(
      data => {
        this.messages.navBarMessages = data['navBarMessages'];
        this.messages.footerMessages = data['footerMessages'];
        this.messages.registrePlaceMessages = data['registrePlaceMessages'];
      },
      msg => console.error(`Error: ${msg.status} ${msg.statusText}`)
    );
  }

  private getUrl(lang?: string): string {
    let url = 'http://localhost:8080/messages';
    lang = lang ?
      lang : localStorage.getItem('lang');
    localStorage.setItem('lang', lang);

    if (lang !== undefined && lang !== 'En') {
      url += (lang === 'Ro') ?
        '/Ro' : '/Ru';
    }

    return url;
  }
}
