import { Place } from '../../models/place';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.sass']
})
export class FinalComponent implements OnInit {
  @Input() place: Place;

  constructor() { }

  ngOnInit() {
  }

}
