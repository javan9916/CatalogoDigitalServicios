import {Component, Inject} from '@angular/core';
import {InformationService} from '../../../../../services/information.service';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {getCreateRequestService, getDeleteRequestService} from '../../../../../querys';

@Component({
  selector: 'app-delete-service-dialog',
  templateUrl: 'delete-service.component.html',
  styleUrls: ['delete-service.component.css']
})
export class DeleteServiceComponent {
  currentUser;
  id_solicitante;
  id_servicio;
  justificacion;
  constructor(private informationService: InformationService,
              private apollo: Apollo,
              private dialogRef: MatDialogRef<DeleteServiceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    // console.log(sessionStorage.getItem('user'));
    this.currentUser = JSON.parse(sessionStorage.getItem('user'));
    this.id_solicitante = this.currentUser.id_usuario;
    this.id_servicio = data.id_servicio;
    console.log(this.id_servicio);
  }
  sendRequest() {
    if (this.id_solicitante === undefined || this.id_servicio === undefined || this.justificacion === undefined) {
      this.informationService.showMessage('Es necesario completar todos los campos', 'warn');
      return
    }
    const Input =  {
      id_solicitante: this.id_solicitante,
      id_servicio: this.id_servicio,
      justificacion: this.justificacion
    }
    console.log(Input);
    this.apollo.mutate({
      mutation: gql `${getDeleteRequestService()}`,
      variables: {Input: Input}
    }).subscribe((result:any) => {
      const response = result.data.crearSolicitudEliminacionServicio;
      console.log(response);
      console.log(response.code)
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

}
