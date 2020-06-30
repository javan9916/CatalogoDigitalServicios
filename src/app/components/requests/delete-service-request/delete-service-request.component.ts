import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { ResponseDeleteServiceRequest, Usuario } from '../../../types/types'
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { getDeleteServiceRequestsQuery, resolveDeleteServiceRequestQuery } from '../../../querys';
import { InformationService } from '../../../services/information.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-delete-service-request',
  templateUrl: './delete-service-request.component.html',
  styleUrls: ['./delete-service-request.component.css']
})
export class DeleteServiceRequestComponent implements OnInit {
  pageIndex = 0;
  pageSize = 5;

  currentUser: Usuario;

  displayedColumns: string[] = ['id','justificacion','action'];
  delete_service_request_data: any = [];
  dataSource = new MatTableDataSource(this.delete_service_request_data);
  dataLength: number = 0;

  state: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apollo: Apollo, private informationService: InformationService,
    private userService: UserService) {
      this.currentUser = this.userService.currentUserValue;
  }

  ngOnInit(): void {
    this.state = null;
    this.getDeleteServiceRequests(this.pageSize, 0, this.state);
  }

  onPageChanged(event) {
    this.getDeleteServiceRequests(event.pageSize, event.pageIndex + 1, this.state);
  }

  getPending() {
    this.state = 'P';
    this.getDeleteServiceRequests(this.pageSize, this.pageIndex, this.state);
  }

  getAccepted() {
    this.state = 'A';
    this.getDeleteServiceRequests(this.pageSize, this.pageIndex, this.state);
  }

  getRejected() {
    this.state = 'R';
    this.getDeleteServiceRequests(this.pageSize, this.pageIndex, this.state);
  }

  public getDeleteServiceRequests = (quantity: number, offset: number, estado: string) => {
    this.delete_service_request_data = [];

    this.apollo.query({
      query: gql `${getDeleteServiceRequestsQuery(quantity, offset, estado)}`,
    }).subscribe( (result: any) => {
      const response: ResponseDeleteServiceRequest = result.data.solicitudesEliminacionServicio;
      if (response.code === 200) {
        this.delete_service_request_data = response.data;
        this.dataSource.data = this.delete_service_request_data;
        this.dataLength = this.dataSource.data.length;
        this.informationService.showMessage(response.message, 'success');
      } else {
        this.informationService.showMessage(response.message, 'warn');
      }
    }, error => {
      console.log(error);
      this.informationService.showMessage('No se han encontrado las solicitudes', 'warn');
    });
  }

  acceptRequest(element) {
    this.resolveTagRequest(element.id_solicitud_eliminacion, this.currentUser.id_usuario, true);
  }

  rejectRequest(element) {
    this.resolveTagRequest(element.id_solicitud_eliminacion, this.currentUser.id_usuario, false);
  }

  public resolveTagRequest = (id_request: number, id_admin: number, decision: boolean) => {
    this.apollo.mutate({
      mutation: gql`${resolveDeleteServiceRequestQuery(id_request, id_admin, decision)}`
    }).subscribe((result: any) => {
      const response = result.data;
      if (response.code === 200) {
        this.getDeleteServiceRequests(this.pageSize, this.pageIndex, this.state);
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
