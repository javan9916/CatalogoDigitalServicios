import { Component } from '@angular/core';
import { InformationService } from '../../../../services/information.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { getCreateRequestSupplier } from '../../../../querys';
import { MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../../../types/types';

@Component({
  selector: 'app-request-provider-dialog',
  templateUrl: 'requestProvider.component.html',
  styleUrls: ['requestProvider.component.css']
})
export class RequestProviderComponent {
  currentUser: Usuario;
  id_solicitante;
  justificacion;

  constructor(private informationService: InformationService,
              private apollo: Apollo,
              private dialogRef: MatDialogRef<RequestProviderComponent>) {
    this.id_solicitante = this.currentUser.id_usuario
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(window.sessionStorage.getItem('user'));
  }

  sendRequest() {
    console.log(this.id_solicitante);
    console.log(this.justificacion);

    if (this.id_solicitante === undefined || this.justificacion === undefined) {
      this.informationService.showMessage('Es necesario completar todos los campos', 'warn');
      return
    }
    const Input =  {
      id_solicitante: this.id_solicitante,
      justificacion: this.justificacion
    }
    this.apollo.mutate({
      mutation: gql `${getCreateRequestSupplier()}`,
      variables: {Input: Input}
    }).subscribe((result:any) => {
      const response = result.data.crearSolicitudProveedor;
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
