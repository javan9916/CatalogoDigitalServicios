import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { ResponseTagRequest, Usuario } from '../../../types/types'
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { getTagRequestsQuery, resolveTagRequestQuery } from '../../../querys';
import { InformationService } from '../../../services/information.service';

@Component({
  selector: 'app-tag-request',
  templateUrl: './tag-request.component.html',
  styleUrls: ['./tag-request.component.css']
})
export class TagRequestComponent implements OnInit {
  pageIndex = 0;
  pageSize = 5;

  currentUser: Usuario;

  displayedColumns: string[] = ['id', 'tag', 'action'];
  tag_request_data: any = [];
  dataSource = new MatTableDataSource(this.tag_request_data);
  dataLength: number = 0;

  state: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apollo: Apollo, private informationService: InformationService) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(window.sessionStorage.getItem('user'));
    this.state = null;
    this.getTagRequests(this.pageSize, (this.pageSize * this.pageIndex), this.state);
  }

  onPageChanged(event) {
    this.getTagRequests(event.pageSize, (event.pageSize * event.pageIndex), this.state);
  }

  getPending() {
    this.state = 'P';
    this.getTagRequests(this.pageSize, (this.pageSize * this.pageIndex), this.state);
  }

  getAccepted() {
    this.state = 'A';
    this.getTagRequests(this.pageSize, (this.pageSize * this.pageIndex), this.state);
  }

  getRejected() {
    this.state = 'R';
    this.getTagRequests(this.pageSize, (this.pageSize * this.pageIndex), this.state);
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

  acceptRequest(element) {
    this.resolveTagRequest(element.id_solicitud_etiqueta, this.currentUser.id_usuario, true);
  }

  rejectRequest(element) {
    this.resolveTagRequest(element.id_solicitud_etiqueta, this.currentUser.id_usuario, false);
  }

  public resolveTagRequest = (id_request: number, id_admin: number, decision: boolean) => {
    this.apollo.mutate({
      mutation: gql`${resolveTagRequestQuery(id_request, id_admin, decision)}`
    }).subscribe((result: any) => {
      const response = result.data.resolverSolicitudEtiqueta;
      if (response.code === 200) {
        this.getTagRequests(this.pageSize, this.pageIndex, this.state);
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
