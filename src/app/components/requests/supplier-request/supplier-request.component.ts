import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { ResponseSupplierRequest, Usuario } from '../../../types/types'
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { getSupplierRequestsQuery, resolveSupplierRequestQuery } from '../../../querys';
import { InformationService } from '../../../services/information.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-supplier-request',
  templateUrl: './supplier-request.component.html',
  styleUrls: ['./supplier-request.component.css']
})
export class SupplierRequestComponent implements OnInit {
  pageIndex = 0;
  pageSize = 5;

  currentUser: Usuario;

  displayedColumns: string[] = ['id','justificacion','action'];
  supplier_request_data: any = [];
  dataSource = new MatTableDataSource(this.supplier_request_data);
  dataLength: number = 0;

  state: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private apollo: Apollo, private informationService: InformationService,
    private userService: UserService) {
      this.currentUser = this.userService.currentUserValue;
     }

  ngOnInit(): void {
    this.state = null;
    this.getSupplierRequests(this.pageSize, 0, this.state);
  }

  onPageChanged(event) {
    this.getSupplierRequests(event.pageSize, event.pageIndex + 1, this.state);
  }

  getPending() {
    this.state = 'P';
    this.getSupplierRequests(this.pageSize, this.pageIndex, this.state);
  }

  getAccepted() {
    this.state = 'A';
    this.getSupplierRequests(this.pageSize, this.pageIndex, this.state);
  }

  getRejected() {
    this.state = 'R';
    this.getSupplierRequests(this.pageSize, this.pageIndex, this.state);
  }

  public getSupplierRequests = (quantity: number, offset: number, estado: string) => {
    this.supplier_request_data = [];

    this.apollo.query({
      query: gql `${getSupplierRequestsQuery(quantity, offset, estado)}`,
    }).subscribe( (result: any) => {
      const response: ResponseSupplierRequest = result.data.solicitudesProveedor;
      if (response.code === 200) {
        this.supplier_request_data = response.data;
        this.dataSource.data = this.supplier_request_data;
        this.dataLength = this.dataSource.data.length;
        this.informationService.showMessage(response.message, 'success');
      } else {
        this.informationService.showMessage(response.message, 'warn');
      }
    }, error => {
      console.log(error)
      this.informationService.showMessage('No se han encontrado las solicitudes', 'warn');
    });
  }

  acceptRequest(element) {
    this.resolveTagRequest(element.id_solicitud_proveedor, this.currentUser.id_usuario, true);
  }

  rejectRequest(element) {
    this.resolveTagRequest(element.id_solicitud_proveedor, this.currentUser.id_usuario, false);
  }

  public resolveTagRequest = (id_request: number, id_admin: number, decision: boolean) => {
    this.apollo.mutate({
      mutation: gql`${resolveSupplierRequestQuery(id_request, id_admin, decision)}`
    }).subscribe((result: any) => {
      const response = result.data.resolverSolicitudProveedor;
      if (response.code === 200) {
        this.getSupplierRequests(this.pageSize, this.pageIndex, this.state);
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
