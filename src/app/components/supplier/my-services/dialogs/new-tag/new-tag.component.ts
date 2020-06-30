import {Component} from '@angular/core';
import {InformationService} from '../../../../../services/information.service';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {MatDialogRef} from '@angular/material/dialog';
import { getCreateRequestTag } from 'src/app/querys';

@Component({
  selector: 'app-new-tag-dialog',
  templateUrl: 'new-tag.component.html',
  styleUrls: ['new-tag.component.css']
})
export class NewTagComponent {
  currentUser;
  id_solicitante;
  etiqueta;
  constructor(private informationService: InformationService,
              private apollo: Apollo,
              private dialogRef: MatDialogRef<NewTagComponent>) {
    // console.log(sessionStorage.getItem('user'));
    this.currentUser = JSON.parse(sessionStorage.getItem('user'));
    this.id_solicitante = this.currentUser.id_usuario;
  }

  sendRequest() {
    console.log(this.id_solicitante);
    console.log(this.etiqueta);

    if (this.id_solicitante === undefined || this.etiqueta === undefined) {
      this.informationService.showMessage('Es necesario completar todos los campos', 'warn');
      return
    }
    const Input =  {
      id_solicitante: this.id_solicitante,
      etiqueta: this.etiqueta
    }
    this.apollo.mutate({
      mutation: gql `${getCreateRequestTag()}`,
      variables: {Input: Input}
    }).subscribe((result:any) => {
      const response = result.data.crearSolicitudEtiqueta;
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
