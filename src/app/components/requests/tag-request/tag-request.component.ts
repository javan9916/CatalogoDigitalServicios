import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { ResponseTagRequest } from '../../../types/types'
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { getTagRequestsQuery } from '../../../querys';
import { InformationService } from '../../../services/information.service';

@Component({
  selector: 'app-tag-request',
  templateUrl: './tag-request.component.html',
  styleUrls: ['./tag-request.component.css']
})
export class TagRequestComponent implements OnInit {
  pageIndex = 0;
  pageSize = 5;

  displayedColumns: string[] = ['id','tag','action'];
  tag_request_data: any = [];
  dataSource = new MatTableDataSource(this.tag_request_data);
  dataLength: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apollo: Apollo, private informationService: InformationService) { }

  ngOnInit(): void {
    this.getTagRequests(this.pageSize, 0);
  }

  onPageChanged(event) {
    this.getTagRequests(event.pageSize, event.pageIndex + 1);
  }

  public getTagRequests = (quantity: number, offset: number) => {
    this.tag_request_data = [];

    this.apollo.query({
      query: gql `${getTagRequestsQuery(quantity, offset)}`,
    }).subscribe( (result: any) => {
      const response: ResponseTagRequest = result.data.solicitudesEtiqueta;
      if (response.code === 200) {
        console.log(response);
        this.tag_request_data = response.data;
        this.dataSource.data = this.tag_request_data;
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
