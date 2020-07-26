import { Component, OnInit } from '@angular/core';
import { Localizacion, Service, Usuario, ResponseService } from '../../types/types';
import { Router } from '@angular/router';
import { getLocationServices } from '../../querys';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { InformationService } from '../../services/information.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  services: any = [];
  service_tags: any = [];

  maplat = 9.937236533452204;
  maplng = -84.09428348902404;
  markerlat: number;
  markerlng: number;
  radius: number;
  locationName: string;
  locationId: number;
  location: Localizacion;
  catalogo: Service;

  currentUser: Usuario;

  constructor(private router: Router,
    private apollo: Apollo,
    private informationService: InformationService) {
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(window.sessionStorage.getItem('user'));
    this.getItems();
    this.getServices(0, 0, this.location.id_localizacion);
  }

  getItems() {
    this.location = JSON.parse(sessionStorage.getItem('location'));
    this.locationName = this.location.nombre;
    this.markerlat = this.location.latitud;
    this.markerlng = this.location.longitud;
    this.radius = Math.round(this.location.radio * 111000);
  }

  isLoggedIn() {
    return window.sessionStorage.getItem('loggedIn') === 'true';
  }

  onHomeClick() {
    this.router.navigateByUrl('/main');
  }

  public getServices = (quantity: number, offset: number, id_localizacion: number) => {
    this.apollo.query({
      query: gql`${getLocationServices(quantity, offset, id_localizacion)}`,
    }).subscribe((result: any) => {
      const response: ResponseService = result.data.servicios;
      if (response.code === 200) {
        this.services = response.data;
        this.informationService.showMessage(response.message, 'success');
      } else {
        this.informationService.showMessage(response.message, 'warn');
      }
    }, error => {
      console.log(error);
      this.informationService.showMessage('No se han encontrado las solicitudes ', 'warn');
    });
  }

  goService(service) {
    console.log(service)
    sessionStorage.setItem('service', JSON.stringify(service));
    this.router.navigate(['/service']);
  }
}
