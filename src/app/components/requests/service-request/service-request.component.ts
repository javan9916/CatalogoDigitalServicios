import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { ResponseServiceRequest, ResponseUsuario } from '../../../types/types'
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { getServiceRequestsQuery } from '../../../querys';
import { InformationService } from '../../../services/information.service';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css']
})
export class ServiceRequestComponent implements OnInit {
  pageIndex = 0;
  pageSize = 5;

  displayedColumns: string[] = ['id','name','action'];
  service_request_data: any = [];
  dataSource = new MatTableDataSource(this.service_request_data);
  dataLength: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apollo: Apollo, private informationService: InformationService) { }

  ngOnInit(): void {
    this.getServiceRequests(this.pageSize, 0);
  }

  onPageChanged(event) {
    this.getServiceRequests(event.pageSize, event.pageIndex + 1);
  }

  public getServiceRequests = (quantity: number, offset: number) => {
    this.service_request_data = [];

    this.apollo.query({
      query: gql `${getServiceRequestsQuery(quantity, offset)}`,
    }).subscribe( (result: any) => {
      const response: ResponseUsuario = result.data.solicitudesServicio;
      if (response.code === 200) {
        console.log(response);
        this.service_request_data = response.data;
        this.dataSource.data = this.service_request_data;
        this.dataLength = this.dataSource.data.length;
        this.informationService.showMessage(response.message, 'success');
      } else {
        console.log(response);
        this.informationService.showMessage(response.message, 'warn');
      }
    }, error => {
      console.log(error)
      this.informationService.showMessage('No se han encontrado las solicitudes ', 'warn');
    });
  }

}
