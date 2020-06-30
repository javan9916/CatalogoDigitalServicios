import { Component, OnInit } from '@angular/core';
import { Localizacion } from '../../types/types';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  maplat = 9.937236533452204;
  maplng = -84.09428348902404;
  markerlat: number;
  markerlng: number;
  radius: number;
  locationName: string;
  location: Localizacion;

  constructor() {
  }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.location = JSON.parse(sessionStorage.getItem('location'));
    console.log(this.location);
    this.locationName = this.location.nombre;
    this.markerlat = this.location.latitud;
    this.markerlng = this.location.longitud;
    this.radius = Math.round(this.location.radio * 111000);
  }

}
