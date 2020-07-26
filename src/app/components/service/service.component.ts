import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario, Service } from '../../types/types';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  currentUser: Usuario;
  service: Service;
  maplat = 9.937236533452204;
  maplng = -84.09428348902404;
  markerlat: number;
  markerlng: number;
  serviceName: string;
  serviceCJ: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(window.sessionStorage.getItem('user'));
    this.getItems();
  }

  getItems() {
    this.service = JSON.parse(sessionStorage.getItem('service'));
    this.serviceName = this.service.nombre;
    this.markerlat = this.service.latitud;
    this.markerlng = this.service.longitud;
    this.serviceCJ = this.service.cedula_j;
  }

  isLoggedIn() {
    return window.sessionStorage.getItem('loggedIn') === 'true';
  }

  onHomeClick() {
    this.router.navigateByUrl('/main');
  }
}
