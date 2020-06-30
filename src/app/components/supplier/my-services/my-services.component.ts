import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {NewTagComponent} from './dialogs/new-tag/new-tag.component';
import {NewServiceComponent} from './dialogs/new-service/new-service.component';
import {DeleteServiceComponent} from './dialogs/delete-service/delete-service.component';

@Component({
  selector: 'app-my-services-component',
  templateUrl: 'my-services.component.html',
  styleUrls: ['my-services.component.css']
})
export class MyServicesComponent {
  columns: string[] = ['sv_id', 'name', 'id', 'actions'];

  currentUser;
  myServices = [];
  constructor(private router: Router,
              private dialog: MatDialog) {
    this.currentUser = JSON.parse(sessionStorage.getItem('user'));
    this.myServices = this.currentUser.servicios;
    console.log(this.myServices);
  }
  onHomeClick() {
    this.router.navigateByUrl('/main');
  }
  isLoggedIn() {
    return sessionStorage.getItem('loggedIn') === 'true';
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
}
