import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {NewTagComponent} from './dialogs/new-tag/new-tag.component';
import {NewServiceComponent} from './dialogs/new-service/new-service.component';
import {DeleteServiceComponent} from './dialogs/delete-service/delete-service.component';
import {ModifyServiceComponent} from './dialogs/modify-service/modify-service.component';
import {ManageTagsComponent} from './dialogs/manage-tags/manage-tags.component';
import {Apollo} from 'apollo-angular';
import {InformationService} from '../../../services/information.service';
import gql from 'graphql-tag';
import {getServices} from '../../../querys';

@Component({
  selector: 'app-my-services-component',
  templateUrl: 'my-services.component.html',
  styleUrls: ['my-services.component.css']
})
export class MyServicesComponent implements OnInit{
  columns: string[] = ['sv_id', 'name', 'id', 'modify', 'tag', 'delete'];

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
    })
  }
}
