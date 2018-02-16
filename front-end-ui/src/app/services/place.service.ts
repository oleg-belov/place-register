import { Place } from '../models/place';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PlaceService {
  private createUrl = 'http://localhost:8080/places/create';
  private uploadImg = 'http://localhost:8080/places/upload';
  constructor(private http: HttpClient) { }

  savePlace(place: Place) {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Basic ' + btoa('info@memorynotfound.com:password'));

    return this.http.post<Place>(this.createUrl, place, { headers: headers });
  }

  savePhoto(file: File): string {
    let res = '';
    const formdata: FormData = new FormData();
    formdata.append('file', file);

    const headers = new HttpHeaders();
    headers.append('Authorization', 'Basic ' + btoa('info@memorynotfound.com:password'));

    this.http.post(this.uploadImg, formdata, { headers: headers }).subscribe(
      data => res =  data['imgUrl'],
      error => console.log(error)
    );
    return res;
  }
}
