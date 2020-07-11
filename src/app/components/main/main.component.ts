import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InformationService } from '../../services/information.service';
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
              private dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(window.sessionStorage.getItem('user'));
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
    window.sessionStorage.removeItem('user');
    this.informationService.showMessage('Se ha cerrado la sesión', 'success');
    window.sessionStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }

  openRequestProviderComponent() {
    this.dialog.open(RequestProviderComponent);
  }

}
