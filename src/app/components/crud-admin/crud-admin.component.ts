import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {getDeleteUser, getUsersByType} from '../../querys';
import {MatDialog} from '@angular/material/dialog';
import {CreateAdminComponent} from './create/create-admin.component';
import {InformationService} from '../../services/information.service';
import {UpdateAdminComponent} from './update/update-admin.component';


@Component({
  selector: 'app-crud-adm',
  templateUrl: './crud-admin.component.html',
  styleUrls: ['./crud-admin.component.css']
})
export class CrudAdminComponent implements OnInit {

  administrators = [];
  displayedColumns = ['id_usuario', 'nombre', 'opciones'];

  constructor(private apollo: Apollo,
              private dialog: MatDialog,
              private informationService: InformationService) { }

  ngOnInit(): void {
    this.get_administrators();
  }

  get_administrators() {
      this.apollo.query({
        query: gql `${getUsersByType(0, 0, 1)}`
      }).subscribe((response: any) => {
        response = response.data.usuarios;
        if (response.code === 200) {
          this.administrators = response.data;
          console.log(this.administrators);
        }
      }, error => {
        console.log(error);
      });
  }

  open_create_dialog(){
    this.dialog.open(CreateAdminComponent, {
      width: '650px'
    }).afterClosed().subscribe(result => {
      if (result === 'reload') {
        window.location.reload();
      }
    });
  }

  openUpdateUser(element) {
    this.dialog.open(UpdateAdminComponent, {
      width: '650px',
      data: element
    }).afterClosed().subscribe(result => {
      if (result === 'reload') {
        window.location.reload();
      }
    })
  }

  deleteUser(id) {
    this.apollo.mutate({
      mutation: gql `${getDeleteUser()}`,
      variables: {ID: id}
    }).subscribe((response: any) => {
      response = response.data.eliminarUsuario;
      console.log(response);
      if (response.code === 200) {
        this.informationService.showMessage(response.message, 'success');
        window.location.reload();
      } else {
        this.informationService.showMessage(response.message, 'warn');
      }
    });
  }

}
