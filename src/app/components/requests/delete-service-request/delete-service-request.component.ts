import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { ResponseDeleteServiceRequest } from '../../../types/types'
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { getDeleteServiceRequestsQuery } from '../../../querys';
import { InformationService } from '../../../services/information.service';

@Component({
  selector: 'app-delete-service-request',
  templateUrl: './delete-service-request.component.html',
  styleUrls: ['./delete-service-request.component.css']
})
export class DeleteServiceRequestComponent implements OnInit {
  pageIndex = 0;
  pageSize = 5;

  displayedColumns: string[] = ['id','justificacion','action'];
  delete_service_request_data: any = [];
  dataSource = new MatTableDataSource(this.delete_service_request_data);
  dataLength: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apollo: Apollo, private informationService: InformationService) { }

  ngOnInit(): void {
    this.getDeleteServiceRequests(this.pageSize, 0);
  }

  onPageChanged(event) {
    this.getDeleteServiceRequests(event.pageSize, event.pageIndex + 1);
  }

  public getDeleteServiceRequests = (quantity: number, offset: number) => {
    this.delete_service_request_data = [];

    this.apollo.query({
      query: gql `${getDeleteServiceRequestsQuery(quantity, offset)}`,
    }).subscribe( (result: any) => {
      const response: ResponseDeleteServiceRequest = result.data.solicitudesEliminacionServicio;
      if (response.code === 200) {
        console.log(response);
        this.delete_service_request_data = response.data;
        this.dataSource.data = this.delete_service_request_data;
        this.dataLength = this.dataSource.data.length;
        this.informationService.showMessage(response.message, 'success');
      } else {
        console.log(response);
        this.informationService.showMessage(response.message, 'warn');
      }
    }, error => {
      console.log(error)
      this.informationService.showMessage('No se han encontrado las solicitudes', 'warn');
    });
  }

}
