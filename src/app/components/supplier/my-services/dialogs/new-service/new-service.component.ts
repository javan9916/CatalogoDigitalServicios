import {Component, Inject} from '@angular/core';
import {InformationService} from '../../../../../services/information.service';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { getCreateRequestService, getLocationsQuery } from '../../../../../querys';

@Component({
  selector: 'app-new-service-dialog',
  templateUrl: 'new-service.component.html',
  styleUrls: ['new-service.component.css']
})
export class NewServiceComponent {
  locationData: any = [];

  currentUser;
  id_solicitante;
  nombre;
  cedula_j;
  descripcion;
  onChosen = false;
  maplat = 9.937236533452204;
  maplng = -84.09428348902404;
  markerlat;
  markerlng;
  constructor(private informationService: InformationService,
              private apollo: Apollo,
              private dialogRef: MatDialogRef<NewServiceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    // console.log(sessionStorage.getItem('user'));
    this.currentUser = JSON.parse(sessionStorage.getItem('user'));
    this.id_solicitante = this.currentUser.id_usuario;
    this.locationData = data.locations;
    console.log(this.id_solicitante);
  }

  onMapClicked(event) {
    console.log(event);
    this.markerlat = event.coords.lat;
    this.markerlng = event.coords.lng;
    this.onChosen = true;
  }

  sendRequest() {
    if (this.id_solicitante === undefined || this.descripcion === undefined || this.nombre === undefined || this.cedula_j === undefined
      || this.markerlng === undefined || this.markerlat === undefined) {
      this.informationService.showMessage('Es necesario completar todos los campos', 'warn');
      return
    }
    const Input =  {
      id_solicitante: this.id_solicitante,
      cedula_j: this.cedula_j,
      nombre: this.nombre,
      descripcion: this.descripcion,
      latitud: this.markerlat,
      longitud: this.markerlng,
      visible: true
    }
    console.log(Input);

    this.apollo.mutate({
      mutation: gql `${getCreateRequestService()}`,
      variables: {Input: Input}
    }).subscribe((result:any) => {
      const response = result.data.crearSolicitudServicio;
      console.log(response);
      if (response.code === 200) {
        this.informationService.showMessage(response.message, 'success');
        this.dialogRef.close();
      } else {
        this.informationService.showMessage(response.message, 'warn');
      }
    }, error => {
      this.informationService.showMessage('Ha ocurrido un error', 'error');
    })
  }

  getRadio(location) {
    var radio = Math.round(location.radio * 111000);
    return radio;
  }

}
