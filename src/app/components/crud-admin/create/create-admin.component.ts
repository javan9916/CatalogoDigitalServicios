import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InformationService} from '../../../services/information.service';
import {getSignupQuery} from '../../../querys';
import {MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-create-adm',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {

  hide = true;

  createAdmin: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    id: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    password1: ['', Validators.required],
    password2: ['', Validators.required]
  });

  constructor(private apollo: Apollo,
              private formBuilder: FormBuilder,
              private informationService: InformationService,
              private dialogRef: MatDialogRef<CreateAdminComponent>) { }

  ngOnInit(): void {
  }

  onSubmit() {

    if (this.createAdmin.get('password1').value === this.createAdmin.get('password2').value) {
      const input = {
        tipo: 1,
        cedula: this.createAdmin.get('id').value,
        nombre: this.createAdmin.get('name').value,
        telefono: this.createAdmin.get('phone').value,
        correo: this.createAdmin.get('email').value,
        contra: this.createAdmin.get('password1').value,
      };
      this.apollo.mutate({
        mutation: gql `${getSignupQuery()}`,
        variables: {Input: input}
      }).subscribe((response: any) => {
        response = response.data.registrarUsuario;
        if (response.code === 200) {
          this.informationService.showMessage(response.message, 'success');
          this.dialogRef.close('reload');
        } else {
          this.informationService.showMessage(response.message, 'warn');
        }
      });
    } else {
      this.informationService.showMessage('Las contraseñas no coinciden', 'warn');
    }
  }
}
