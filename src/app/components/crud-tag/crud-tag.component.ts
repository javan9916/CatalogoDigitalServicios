import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogComponent } from '../dialog/dialog.component'
import { InputTag, Usuario, ResponseTagRequest, InputUpdateTag } from '../../types/types'

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { InformationService } from '../../services/information.service';
import { getTagQuery, getTagRequestsQuery, getTagUpdateQuery, getTagDeleteQuery } from '../../querys';

@Component({
  selector: 'app-crud-tag',
  templateUrl: './crud-tag.component.html',
  styleUrls: ['./crud-tag.component.css']
})
export class CrudTagComponent implements OnInit {
  pageIndex = 0;
  pageSize = 5;

  currentUser: Usuario;

  displayedColumns: string[] = ['id', 'tag', 'action'];
  tag_request_data: any = [];
  dataSource = new MatTableDataSource(this.tag_request_data);
  dataLength: number = 0;

  state: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog,
    private apollo: Apollo,
    private informationService: InformationService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(window.sessionStorage.getItem('user'));
    this.state = 'A';
    this.getTagRequests(this.pageSize, (this.pageSize * this.pageIndex), this.state);
  }

  onPageChanged(event) {
    this.getTagRequests(event.pageSize, (event.pageSize * event.pageIndex), this.state);
  }

  public getTagRequests = (quantity: number, offset: number, estado: string) => {
    this.tag_request_data = [];

    this.apollo.query({
      query: gql`${getTagRequestsQuery(quantity, offset, estado)}`,
    }).subscribe((result: any) => {
      const response: ResponseTagRequest = result.data.solicitudesEtiqueta;
      if (response.code === 200) {
        this.tag_request_data = response.data;
        this.dataSource.data = this.tag_request_data;
        this.dataLength = response.count;
        this.informationService.showMessage(response.message, 'success');
      } else {
        this.informationService.showMessage(response.message, 'warn');
      }
    }, error => {
      console.log(error);
      this.informationService.showMessage('No se han encontrado las solicitudes ', 'warn');
    });
  }


  openDialog(element, action, index) {
    const dialogConfig = new MatDialogConfig();

    console.log(element);

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '80%';
    dialogConfig.maxHeight = '80%';

    if (action == 'Nueva Etiqueta') {
      dialogConfig.data = {
        action: action
      }
    } else if (action == 'Editar Etiqueta') {
      dialogConfig.data = {
        action: action,
        index: index,
        tag: element.etiqueta,
        id: element.id_solicitud_etiqueta,
      }
    } else if (action == 'Eliminar Etiqueta') {
      dialogConfig.data = {
        action: action,
        index: index,
        tag: element.etiqueta,
        id: element.id_solicitud_etiqueta,
      }
    }

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data != undefined) {
        if (data.action == 'Nueva Etiqueta') {
          const inputTag: InputTag = {
            nombre: data.name
          };
          this.createTag(inputTag);
        } else if (data.action == 'Editar Etiqueta') {
          const inputTag: InputUpdateTag = {
            id_etiqueta: data.id,
            nombre: data.name
          }
          this.updateTag(inputTag);
        } else if (data.action == 'Eliminar Etiqueta') {
          this.deleteTag(data.id);
        }
      }
    })
  }

  public createTag = (inputTag: InputTag) => {
    this.apollo.mutate({
      mutation: gql`${getTagQuery()}`,
      variables: { Input: inputTag }
    }).subscribe((result: any) => {
      const response = result.data.agregarEtiqueta;
      if (response.code === 200) {
        this.informationService.showMessage(response.message, 'success');
      } else if (response.code === 400) {
        this.informationService.showMessage(response.message, 'warn');
      }
    }, error => {
      console.log(error);
      this.informationService.showMessage('Error message', 'error');
    });
  }

  public updateTag = (inputTag: InputUpdateTag) => {
    this.apollo.mutate({
      mutation: gql`${getTagUpdateQuery()}`,
      variables: { Input: inputTag }
    }).subscribe((result: any) => {
      const response = result.data.modificarEtiqueta;
      if (response.code === 200) {
        this.informationService.showMessage(response.message, 'success');
      } else if (response.code === 400) {
        this.informationService.showMessage(response.message, 'warn');
      }
    }, error => {
      console.log(error);
      this.informationService.showMessage('Error message', 'error');
    });
  }

  public deleteTag = (id: number) => {
    this.apollo.mutate({
      mutation: gql`${getTagDeleteQuery(id)}`
    }).subscribe((result: any) => {
      const response = result.data.eliminarEtiqueta;
      if (response.code === 200) {
        this.informationService.showMessage(response.message, 'success');
      } else if (response.code === 400) {
        this.informationService.showMessage(response.message, 'warn');
      }
    }, error => {
      console.log(error);
      this.informationService.showMessage('Error message', 'error');
    });
  }

}
