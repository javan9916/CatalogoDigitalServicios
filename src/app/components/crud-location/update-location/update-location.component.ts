import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';

import { ResponseLocalizacion, InputUpdateLocalizacion } from '../../../types/types';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { getLocationsQuery, deleteLocationQuery, updateLocationQuery, getAllLocationsQuery } from '../../../querys';
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
    private informationService: InformationService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getLocations(this.pageSize, (this.pageSize * this.pageIndex));
  }

  onPageChanged(event) {
    this.getLocations(event.pageSize, (event.pageSize * event.pageIndex));
  }

  public getLocations = (quantity: number, offset: number) => {
    this.location_data = [];

    this.apollo.query({
      query: gql `${getAllLocationsQuery(quantity, offset)}`,
    }).subscribe( (result: any) => {
      const response: ResponseLocalizacion = result.data.localizaciones;
      if (response.code === 200) {
        console.log(response);
        this.location_data = response.data;
        this.dataSource.data = this.location_data;
        this.dataLength = response.count;
        this.informationService.showMessage(response.message, 'success');
      } else {
        console.log(response);
        this.informationService.showMessage(response.message, 'warn');
      }
    }, error => {
      console.log(error)
      this.informationService.showMessage('No se ha encontrado la localización', 'warn');
    });
  }

  openDialog(element, action, index) {
    const dialogConfig = new MatDialogConfig();

    console.log(element);

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '80%';
    dialogConfig.maxHeight = '80%';

    if (action == 'Eliminar') {
      dialogConfig.data = {
        id: element.id_localizacion,
        name: element.nombre,
        index: index,
        action: action
      }
    } else if (action == 'Editar') {
      dialogConfig.data = {
        id: element.id_localizacion,
        name: element.nombre,
        visible: element.visible,
        lat: element.latitud,
        lng: element.longitud,
        radius: element.radio,
        index: index,
        action: action
      }
    }

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data != undefined) {
        if (data.action == 'Eliminar') {
          this.deleteLocation(data.id);
        } else if (data.action == 'Editar') {
          const inputLocalizacion: InputUpdateLocalizacion = {
            id_localizacion: data.id,
            nombre: data.name,
            latitud: data.lat,
            longitud: data.lng,
            radio: data.radius/111000,
            visible: data.visible,
          }
          console.log(inputLocalizacion);
          this.updateLocation(inputLocalizacion);
        }
      }
    })
  }

  public deleteLocation = (id: number) => {
    this.apollo.mutate({
      mutation: gql `${deleteLocationQuery(id)}`,
    }).subscribe( (result: any) => {
      const response: ResponseLocalizacion = result.data.eliminarLocalizacion;
      console.log(response);
      if (response.code === 200) {
        this.getLocations(this.pageSize, this.pageIndex);
        this.informationService.showMessage(response.message, 'success');
        window.location.reload();
      } else {
        this.informationService.showMessage(response.message, 'warn');
      }
    }, error => {
      this.informationService.showMessage('No se ha encontrado la localización', 'warn');
    });
  }

  public updateLocation = (inputUpdateLocalizacion: InputUpdateLocalizacion) => {
    this.apollo.mutate({
        mutation: gql `${updateLocationQuery()}`,
      variables: {Input: inputUpdateLocalizacion}
    }).subscribe((result: any) => {
      const response = result.data;
      console.log(response);
      if (response.code === 200) {
        this.getLocations(this.pageSize, this.pageIndex);
        this.informationService.showMessage(response.message, 'success');
        window.location.reload();
      } else if (response.code === 400) {
        this.informationService.showMessage(response.message, 'warn');
      }
    }, error => {
      this.informationService.showMessage('Error message', 'error');
    });
  }

}
