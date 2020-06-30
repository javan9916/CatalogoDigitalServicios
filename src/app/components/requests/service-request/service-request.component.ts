import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { ResponseServiceRequest, Usuario } from '../../../types/types'
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { getServiceRequestsQuery, resolveServiceRequestQuery } from '../../../querys';
import { InformationService } from '../../../services/information.service';
import { UserService } from '../../../services/user/user.service';


@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css']
})
export class ServiceRequestComponent implements OnInit {
  pageIndex = 0;
  pageSize = 5;

  currentUser: Usuario;

  displayedColumns: string[] = ['id','name','action'];
  service_request_data: any = [];
  dataSource = new MatTableDataSource(this.service_request_data);
  dataLength: number = 0;

  state: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apollo: Apollo, private informationService: InformationService,
    private userService: UserService) { 
      this.currentUser = this.userService.currentUserValue; 
    }

  ngOnInit(): void {
    this.state = null;
    this.getServiceRequests(this.pageSize, 0, this.state);
  }

  onPageChanged(event) {
    this.getServiceRequests(event.pageSize, event.pageIndex + 1, this.state);
  }

  getPending() {
    this.state = 'P';
    this.getServiceRequests(this.pageSize, this.pageIndex, this.state);
  }

  getAccepted() {
    this.state = 'A';
    this.getServiceRequests(this.pageSize, this.pageIndex, this.state);
  }

  getRejected() {
    this.state = 'R';
    this.getServiceRequests(this.pageSize, this.pageIndex, this.state);
  }

  public getServiceRequests = (quantity: number, offset: number, estado: string) => {
    this.service_request_data = [];

    this.apollo.query({
      query: gql `${getServiceRequestsQuery(quantity, offset, estado)}`,
    }).subscribe( (result: any) => {
      const response: ResponseServiceRequest = result.data.solicitudesServicio;
      if (response.code === 200) {
        this.service_request_data = response.data;
        this.dataSource.data = this.service_request_data;
        this.dataLength = this.dataSource.data.length;
        this.informationService.showMessage(response.message, 'success');
      } else {
        this.informationService.showMessage(response.message, 'warn');
      }
    }, error => {
      console.log(error)
      this.informationService.showMessage('No se han encontrado las solicitudes ', 'warn');
    });
  }

  acceptRequest(element) {
    this.resolveTagRequest(element.id_solicitud_servicio, this.currentUser.id_usuario, true);
  }

  rejectRequest(element) {
    this.resolveTagRequest(element.id_solicitud_servicio, this.currentUser.id_usuario, false);
  }

  public resolveTagRequest = (id_request: number, id_admin: number, decision: boolean) => {
    this.apollo.mutate({
      mutation: gql`${resolveServiceRequestQuery(id_request, id_admin, decision)}`
    }).subscribe((result: any) => {
      const response = result.data.resolverSolicitudServicio;
      if (response.code === 200) {
        this.getServiceRequests(this.pageSize, this.pageIndex, this.state);
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
