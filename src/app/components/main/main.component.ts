import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {InformationService} from '../../services/information.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router,
              private informationService: InformationService) { }

  ngOnInit(): void {
  }

  onHomeClick() {
    this.router.navigateByUrl('/main');
  }

  isLoggedIn() {
    return sessionStorage.getItem('loggedIn') === 'true';
  }

  logout() {
    this.informationService.showMessage('Se ha cerrado la sesión', 'success');
    sessionStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }

}
