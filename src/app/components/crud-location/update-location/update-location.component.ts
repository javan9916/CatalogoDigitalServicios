import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { ResponseLocalizacion } from '../../../types/types'
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { getLocationsQuery } from '../../../querys';
import { InformationService } from '../../../services/information.service';

@Component({
  selector: 'app-update-location',
  templateUrl: './update-location.component.html',
  styleUrls: ['./update-location.component.css']
})
export class UpdateLocationComponent implements OnInit {
  pageIndex = 0;
  pageSize = 5;

  displayedColumns: string[] = ['id','name','action'];
  location_data: any = [];
  dataSource = new MatTableDataSource(this.location_data);
  dataLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apollo: Apollo,
    private informationService: InformationService,) { }

  ngOnInit(): void {
    this.getLocations(this.pageSize, 0);
  }

  onPageChanged(event) {
    this.getLocations(event.pageSize, event.pageIndex + 1);
  }

  public getLocations = (quantity: number, offset: number) => {
    this.location_data = [];

    this.apollo.query({
      query: gql `${getLocationsQuery(quantity, offset)}`,
    }).subscribe( (result: any) => {
      const response: ResponseLocalizacion = result.data.localizaciones;
      if (response.code === 200) {
        console.log(response);
        this.location_data = response.data;
        this.dataSource.data = this.location_data;
        this.informationService.showMessage(response.message, 'success');
      } else {
        this.informationService.showMessage(response.message, 'warn');
      }
    }, error => {
      this.informationService.showMessage('No se ha encontrado la localización', 'warn');
    });
  }

}
