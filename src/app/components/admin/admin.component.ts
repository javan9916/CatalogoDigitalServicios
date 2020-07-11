import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from '../../types/types'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  currentUser: Usuario;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router) {}

  ngOnInit(){
    this.currentUser = JSON.parse(window.sessionStorage.getItem('user'));
  }

  onHomeClick() {
    this.router.navigateByUrl('/main');
  }

  isLoggedIn() {
    return window.sessionStorage.getItem('loggedIn') === 'true';
  }

}
