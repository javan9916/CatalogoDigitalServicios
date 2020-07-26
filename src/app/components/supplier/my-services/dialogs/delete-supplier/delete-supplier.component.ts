import { Component, OnInit, Inject } from '@angular/core';
import {InformationService} from '../../../../../services/information.service';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Service } from '../../../../../types/types';
import { updateServiceSupplier } from '../../../../../querys';

@Component({
  selector: 'app-delete-supplier',
  templateUrl: './delete-supplier.component.html',
  styleUrls: ['./delete-supplier.component.css']
})
export class DeleteSupplierComponent implements OnInit {

  currentUser;
  service: Service;
  service_id: number;
  supplier: number;
  add: boolean;

  constructor(private informationService: InformationService,
    private apollo: Apollo,
    private dialogRef: MatDialogRef<DeleteSupplierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

      this.currentUser = JSON.parse(sessionStorage.getItem('user'));
      this.supplier = this.currentUser.id_usuario;
      this.service = data.service;
      this.service_id = this.service.id_servicio;
    }

  ngOnInit(): void {
  }

  public updateSuppliers = (id_servicio: number, id_encargado: number) => {
    console.log(id_servicio);
    console.log(id_encargado);
    this.add = false;
    this.apollo.mutate({
        mutation: gql `${ updateServiceSupplier(id_servicio, id_encargado, this.add) }`
    }).subscribe((result: any) => {
      const response = result.data.modificarEncargadoServicio;
      console.log(response);
      if (response.code === 200) {
        this.informationService.showMessage(response.message, 'success');
        this.dialogRef.close();
      } else if (response.code === 400) {
        this.informationService.showMessage(response.message, 'warn');
      }
    }, error => {
      console.log(error);
      this.informationService.showMessage('Ha ocurrido un error', 'error');
    });
  }

}
