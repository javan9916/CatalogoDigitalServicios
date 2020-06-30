import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { ResponseSupplierRequest } from '../../../types/types'
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { getSupplierRequestsQuery } from '../../../querys';
import { InformationService } from '../../../services/information.service';

@Component({
  selector: 'app-supplier-request',
  templateUrl: './supplier-request.component.html',
  styleUrls: ['./supplier-request.component.css']
})
export class SupplierRequestComponent implements OnInit {
  pageIndex = 0;
  pageSize = 5;

  displayedColumns: string[] = ['id','justificacion','action'];
  supplier_request_data: any = [];
  dataSource = new MatTableDataSource(this.supplier_request_data);
  dataLength: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private apollo: Apollo, private informationService: InformationService) { }

  ngOnInit(): void {
    this.getSupplierRequests(this.pageSize, 0);
  }

  onPageChanged(event) {
    this.getSupplierRequests(event.pageSize, event.pageIndex + 1);
  }

  public getSupplierRequests = (quantity: number, offset: number) => {
    this.supplier_request_data = [];

    this.apollo.query({
      query: gql `${getSupplierRequestsQuery(quantity, offset)}`,
    }).subscribe( (result: any) => {
      const response: ResponseSupplierRequest = result.data.solicitudesProveedor;
      if (response.code === 200) {
        console.log(response);
        this.supplier_request_data = response.data;
        this.dataSource.data = this.supplier_request_data;
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
