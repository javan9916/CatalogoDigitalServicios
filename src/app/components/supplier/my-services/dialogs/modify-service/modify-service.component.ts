import {Component, Inject, OnInit} from '@angular/core';
import {InformationService} from '../../../../../services/information.service';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {modifyServiceQuery} from '../../../../../querys';

@Component({
  selector: 'app-modify-service-dialog',
  templateUrl: 'modify-service.component.html',
  styleUrls: ['modify-service.component.css']
})
export class ModifyServiceComponent implements OnInit{
  currentService;
  name;
  id;
  description;
  visible;
  constructor(private informationService: InformationService,
              private apollo: Apollo,
              private dialogRef: MatDialogRef<ModifyServiceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentService = data.service;
  }

  ngOnInit(): void {
    console.log(this.currentService);
    this.name = this.currentService.nombre;
    this.id = this.currentService.cedula_j;
    this.description = this.currentService.descripcion;
    this.visible = this.currentService.visible;
  }

  modifyService() {
    const obj = {
      id_servicio: this.currentService.id_servicio,
      cedula_j: this.id,
      nombre: this.name,
      descripcion: this.description,
      visible: this.visible
    };
    this.apollo.mutate({
      mutation: gql `${modifyServiceQuery()}`,
      variables: {Input: obj}
    }).subscribe((result: any) => {
      result = result.data.modificarServicio;
      if (result.code === 200) {
        this.informationService.showMessage(result.message, 'success');
        this.dialogRef.close('refresh');
      } else if (result.code === 400) {
        this.informationService.showMessage(result.message, 'warn');
      }
    }, error => {
      this.informationService.showMessage('Error message', 'error');
    });
  }

}
