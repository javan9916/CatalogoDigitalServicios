import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';

@Component({
  selector: 'app-supplier-component',
  templateUrl: 'supplier.component.html',
  styleUrls: ['supplier.component.css']
})
export class SupplierComponent {
  currentUser;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    
  constructor(private router: Router,
              private breakpointObserver: BreakpointObserver) {
    this.currentUser = JSON.parse(sessionStorage.getItem('user'));
  }

  onHomeClick() {
    this.router.navigateByUrl('/main');
  }

  isLoggedIn() {
    return sessionStorage.getItem('loggedIn') === 'true';
  }
}
