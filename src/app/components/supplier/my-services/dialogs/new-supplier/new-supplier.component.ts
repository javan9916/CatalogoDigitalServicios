import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { getUsersByType, getSupplierServices } from '../../../../../querys';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ResponseService } from '../../../../../types/types';

@Component({
  selector: 'app-new-supplier',
  templateUrl: './new-supplier.component.html',
  styleUrls: ['./new-supplier.component.css']
})
export class NewSupplierComponent implements OnInit {

  suppliers: any = [];
  services: any = [];

  supplierForm: FormGroup;

  encargado: number;
  supplier: number;
  service: number;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<NewSupplierComponent>,
    @Inject(MAT_DIALOG_DATA) data, public dialog: MatDialog, private apollo: Apollo) { 
      this.encargado = data.id;
    }

  ngOnInit(): void {
    this.supplierForm = this.formBuilder.group({
      supplier: [this.supplier],
      service: [this.service]
    });

    this.getServices(0, 0, this.encargado);
    this.getSuppliers(0, 0, 2);
  }

  public getServices = (quantity: number, offset: number, id_encargado: number) => {
    this.apollo.query({
      query: gql `${ getSupplierServices(quantity, offset, id_encargado) }`,
    }).subscribe( (result: any) => {
      const response: ResponseService = result.data.servicios;
      if (response.code === 200) {
        this.services = response.data;
      } else {
        console.log(response);
      }
    }, error => {
      console.log(error);
    });
  }

  public getSuppliers = (quantity: number, offset: number, tipo: number) => {
    this.apollo.query({
      query: gql `${getUsersByType(quantity, offset, tipo)}`,
    }).subscribe( (result: any) => {
      const response: ResponseService = result.data.usuarios;
      if (response.code === 200) {
        this.suppliers = response.data;
        this.cleanSupList(this.suppliers);
      } else {
        console.log(response);
      }
    }, error => {
      console.log(error);
    });
  }

  cleanSupList(sups) {
    for (let i = 0; i < sups.length; i++) {
      const element = sups[i];
      if (element.id_usuario == this.encargado) {
        var index = sups.indexOf(element);
        sups.splice(index, 1);
      }
    }
  }

  save() {
    this.dialogRef.close(this.supplierForm.value);
  }

  close() {
    this.dialogRef.close();
  }
}
