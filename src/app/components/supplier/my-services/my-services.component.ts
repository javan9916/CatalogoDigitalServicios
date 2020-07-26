import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { NewTagComponent } from './dialogs/new-tag/new-tag.component';
import { NewServiceComponent } from './dialogs/new-service/new-service.component';
import { DeleteServiceComponent } from './dialogs/delete-service/delete-service.component';
import { ModifyServiceComponent } from './dialogs/modify-service/modify-service.component';
import { ManageTagsComponent } from './dialogs/manage-tags/manage-tags.component';
import { NewSupplierComponent } from './dialogs/new-supplier/new-supplier.component';
import { DeleteSupplierComponent} from './dialogs/delete-supplier/delete-supplier.component';
import { Apollo } from 'apollo-angular';
import { InformationService } from '../../../services/information.service';
import gql from 'graphql-tag';
import { getServices, updateServiceSupplier } from '../../../querys';
import { ResponseService } from '../../../types/types';

@Component({
  selector: 'app-my-services-component',
  templateUrl: 'my-services.component.html',
  styleUrls: ['my-services.component.css']
})
export class MyServicesComponent implements OnInit{
  columns: string[] = ['sv_id', 'name', 'id', 'modify', 'tag', 'delete', 'supplier'];

  currentUser;
  myServices = [];

  constructor(private router: Router,
              private dialog: MatDialog,
              private apollo: Apollo,
              private informationService: InformationService,) {
    this.currentUser = JSON.parse(sessionStorage.getItem('user'));
  }

  ngOnInit(): void {
    this.getUserServices();
  }


  onHomeClick() {
    this.router.navigateByUrl('/main');
  }

  isLoggedIn() {
    return sessionStorage.getItem('loggedIn') === 'true';
  }

  getUserServices() {
    this.apollo.query({
      query: gql `${getServices()}`,
      variables: {Quantity: 0, Offset: 0, Encargado: this.currentUser.id_usuario}
      }
    ).subscribe((result: any) => {
      result = result.data.servicios;
      if (result.code === 200) {
        this.myServices = result.data;
        this.informationService.showMessage(result.message, 'success');
      } else {
        this.informationService.showMessage(result.message, 'warn');
      }
    }, error => {
      console.log(error)
    })
  }

  openNewTagComponent() {
    this.dialog.open(NewTagComponent);
  }

  openNewServiceComponent() {
    this.dialog.open(NewServiceComponent, {
      width: '800px'
    });
  }

  openDeleteServiceComponent(id_servicio) {
    this.dialog.open(DeleteServiceComponent, {
      data: {
        id_servicio: id_servicio
      }
    }).afterClosed().subscribe(res => {
      window.location.reload();
    });
  }

  openModifyServiceComponent(service) {
    this.dialog.open(ModifyServiceComponent, {
      data: {
        service: service
      },
    }).afterClosed().subscribe(result => {
      if (result === 'refresh') {
        window.location.reload();
      }
    });
  }

  openManageTags(service) {
    this.dialog.open(ManageTagsComponent, {
      data: {
        service: service
      },
      width: '400px'
    }).afterClosed().subscribe(res => {
      window.location.reload();
    })
  }

  addNewSupplier() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '80%';
    dialogConfig.maxHeight = '80%';

    dialogConfig.data = {
      id: this.currentUser.id_usuario
    }

    const dialogRef = this.dialog.open(NewSupplierComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data != undefined) {
        this.updateSuppliers(data.service.id_servicio, data.supplier.id_usuario, true);
      }
    })
  }

  public updateSuppliers = (id_servicio: number, id_encargado: number, add: boolean) => {
    console.log(id_servicio);
    console.log(id_encargado);
    this.apollo.mutate({
        mutation: gql `${ updateServiceSupplier(id_servicio, id_encargado, add) }`
    }).subscribe((result: any) => {
      const response = result.data.modificarEncargadoServicio;
      console.log(response);
      if (response.code === 200) {
        this.informationService.showMessage(response.message, 'success');
      } else if (response.code === 400) {
        this.informationService.showMessage(response.message, 'warn');
      }
    }, error => {
      console.log(error);
      this.informationService.showMessage('Error message', 'error');
    });
  }

  openUpdateSupplierService(service) {
    this.dialog.open(DeleteSupplierComponent, {
      data: {
        service: service
      },
      width: '400px'
    }).afterClosed().subscribe(res => {
      window.location.reload();
    })
  }
}
