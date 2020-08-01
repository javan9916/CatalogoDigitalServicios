import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { getAllServices, getTags, getServicesByTags, getLocationsQuery, getServicesByLocation } from '../../querys';
import { ResponseLocalizacion, Usuario, ResponseTag, ResponseService } from '../../types/types';
import { InformationService } from '../../services/information.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})

export class ServicesComponent implements OnInit {
  locationData: any = [];
  serviceData: any = [];
  tagData: any = [];
  tags: any = [];
  tagsToSend: any = [];
  currentUser: Usuario;

  radius: number = 2000;
  maplat = 9.937236533452204;
  maplng = -84.09428348902404;

  constructor(private router: Router,
    private apollo: Apollo,
    private informationService: InformationService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(window.sessionStorage.getItem('user'));
    this.getLocations(0, 0, true);
    this.getServices(0, 0);
    this.getTags(0, 0);
  }

  onHomeClick() {
    this.router.navigateByUrl('/main');
  }

  public getLocations = (quantity: number, offset: number, visible: true) => {
    this.apollo.query({
      query: gql`${getLocationsQuery(quantity, offset, visible)}`
    }).subscribe((result: any) => {
      const response: ResponseLocalizacion = result.data.localizaciones;
      if (response.code === 200) {
        this.locationData = response.data;
        this.informationService.showMessage(response.message, 'success');
      } else {
        this.informationService.showMessage(response.message, 'warn');
      }
    }, error => {
      this.informationService.showMessage('No se han encontrado los servicios', 'warn');
      console.log(error);
    });
  }

  public getServices = (quantity: number, offset: number) => {
    this.apollo.query({
      query: gql`${getAllServices(quantity, offset)}`
    }).subscribe((result: any) => {
      const response: ResponseService = result.data.servicios;
      if (response.code === 200) {
        this.serviceData = []
        this.serviceData = response.data;
        this.informationService.showMessage(response.message, 'success');
      } else {
        this.informationService.showMessage(response.message, 'warn');
      }
    }, error => {
      this.informationService.showMessage('No se han encontrado los servicios', 'warn');
      console.log(error);
    });
  }

  public getServicesByTag = (quantity: number, offset: number, etiquetas: any) => {
    if (typeof etiquetas !== 'undefined' && etiquetas.length === 0) {
      this.getServices(0, 0);
    } else {
      this.apollo.query({
        query: gql`${getServicesByTags(quantity, offset, etiquetas)}`
      }).subscribe((result: any) => {
        const response: ResponseService = result.data.servicios;
        if (response.code === 200) {
          this.serviceData = []
          this.serviceData = response.data;
          console.log(this.serviceData);
          this.informationService.showMessage(response.message, 'success');
        } else {
          this.informationService.showMessage(response.message, 'warn');
        }
      }, error => {
        this.informationService.showMessage('No se han encontrado servicios', 'warn');
        console.log(error);
      });
    }
  }

  public getServicesByLocation = (quantity: number, offset: number, latitud: number, longitud: number, radio: number) => {

    this.apollo.query({
      query: gql`${getServicesByLocation(quantity, offset, latitud, longitud, radio)}`
    }).subscribe((result: any) => {
      const response: ResponseService = result.data.servicios;
      if (response.code === 200) {
        this.serviceData = []
        this.serviceData = response.data;
        console.log(this.serviceData);
        this.informationService.showMessage(response.message, 'success');
      } else {
        this.informationService.showMessage(response.message, 'warn');
      }
    }, error => {
      this.informationService.showMessage('No se han encontrado servicios', 'warn');
      console.log(error);
    });
  }

  public getTags = (quantity: number, offset: number) => {
    this.apollo.query({
      query: gql`${getTags(quantity, offset)}`
    }).subscribe((result: any) => {
      const response: ResponseTag = result.data.etiquetas;
      if (response.code === 200) {
        this.tagData = response.data;
        this.buildCheckTags();
        this.informationService.showMessage(response.message, 'success');
      } else {
        this.informationService.showMessage(response.message, 'warn');
      }
    }, error => {
      this.informationService.showMessage('No se han encontrado etiquetas', 'warn');
      console.log(error);
    });
  }

  goService(service) {
    sessionStorage.setItem('service', JSON.stringify(service));
    this.router.navigate(['/service']);
  }

  getRadio(location) {
    var radio = Math.round(location.radio * 111000);
    return radio;
  }

  buildCheckTags() {
    for (let tag of this.tagData) {
      var newElement = { id: tag.id_etiqueta, name: tag.nombre, state: false }
      this.tags.push(newElement);
    }
  }

  getChecked() {
    this.tagsToSend = []

    for (let tag of this.tags) {
      if (tag.state) {
        this.tagsToSend.push(tag.id);
      }
    }
    this.getServicesByTag(0, 0, this.tagsToSend);
  }

  onMapClicked(event) {
    var latitud = event.coords.lat
    var longitud = event.coords.lng

    this.getServicesByLocation(0, 0, latitud, longitud, this.radius/111000);
  }

}
