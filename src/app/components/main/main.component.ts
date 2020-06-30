import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InformationService } from '../../services/information.service';
import { UserService } from '../../services/user/user.service';
import { Usuario } from '../../types/types';
import {MatDialog} from '@angular/material/dialog';
import {RequestProviderComponent} from './dialogs/requestProvider/requestProvider.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  currentUser: Usuario;

  constructor(private router: Router,
              private informationService: InformationService,
              private userService: UserService,
              private dialog: MatDialog) {
    this.currentUser = JSON.parse(sessionStorage.getItem('user'));
  }

  ngOnInit(): void {
    console.log(this.currentUser);
  }

  onHomeClick() {
    this.router.navigateByUrl('/main');
  }

  isLoggedIn() {
    return sessionStorage.getItem('loggedIn') === 'true';
  }

  getUserType() {
    return this.currentUser.tipo;
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.userService.currentUserSubject.next(null);
    this.informationService.showMessage('Se ha cerrado la sesión', 'success');
    sessionStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }

  openRequestProviderComponent() {
    this.dialog.open(RequestProviderComponent);
  }

}
