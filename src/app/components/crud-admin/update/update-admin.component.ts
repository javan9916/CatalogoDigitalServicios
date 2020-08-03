import { Component, OnInit, Inject } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InformationService} from '../../../services/information.service';
import {getSignupQuery, getUpdateUser} from '../../../querys';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-update-adm',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {

  name;
  id;
  email;
  phone;

  updateAdmin: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    id: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
  });

  constructor(private apollo: Apollo,
              private formBuilder: FormBuilder,
              private informationService: InformationService,
              private dialogRef: MatDialogRef<UpdateAdminComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.name = this.data.nombre;
    this.id = this.data.cedula;
    this.email = this.data.correo;
    this.phone = this.data.telefono;
  }

  onSubmit() {
    const input = {
      id_usuario: this.data.id_usuario,
      cedula: this.updateAdmin.get('id').value,
      nombre: this.updateAdmin.get('name').value,
      telefono: this.updateAdmin.get('phone').value,
      correo: this.updateAdmin.get('email').value,
    };
    this.apollo.mutate({
      mutation: gql `${getUpdateUser()}`,
      variables: {Input: input}
    }).subscribe((response: any) => {
      response = response.data.modificarUsuario;
      if (response.code === 200) {
        this.informationService.showMessage(response.message, 'success');
        this.dialogRef.close('reload');
      } else {
        this.informationService.showMessage(response.message, 'warn');
      }
    });
  }
}
