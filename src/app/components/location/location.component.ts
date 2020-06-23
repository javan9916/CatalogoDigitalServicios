import { Component, OnInit } from '@angular/core';
import {Localizacion} from '../../types/types';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  maplat = 9.937236533452204;
  maplng = -84.09428348902404;
  locationName: string;
  location: Localizacion;


  constructor() {
  }

  ngOnInit(): void {
    this.getLocation();
    this.locationName = this.location.nombre;
  }

  getLocation() {
    this.location = JSON.parse(sessionStorage.getItem('location'));
  }

}
