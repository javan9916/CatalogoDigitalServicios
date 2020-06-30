import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {InformationService} from '../../services/information.service';
import {getLocationsQuery} from '../../querys';
import gql from 'graphql-tag';
import { ResponseLocalizacion } from '../../types/types';
import {Router} from '@angular/router';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  locationData: any = [];
  loading: boolean;

  constructor(private apollo: Apollo,
              private router: Router,
              private informationService: InformationService) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.getLocations(0, 0);
  }

  public getLocations = (quantity: number, offset: number) => {
    this.apollo.query({
      query: gql `${getLocationsQuery(quantity, offset)}`
    }).subscribe((result: any) => {
      const response: ResponseLocalizacion = result.data.localizaciones;
      if (response.code === 200) {
        this.locationData = response.data;
        console.log(this.locationData);
        this.loading = false;
        this.informationService.showMessage(response.message, 'success');
      } else {
        this.informationService.showMessage(response.message, 'warn');
      }
    }, error => {
      this.informationService.showMessage('No se ha encontrado la localización', 'warn');
      console.log(error);
    });
  }

  public onClick(location) {
    sessionStorage.setItem('location', JSON.stringify(location));
    this.router.navigate(['main/location']);
  }
}
