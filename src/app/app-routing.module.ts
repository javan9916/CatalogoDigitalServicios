import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminComponent } from './components/admin/admin.component';
import { CrudLocationComponent } from './components/crud-location/crud-location.component';
import { LocationsComponent } from './components/locations/locations.component';
import { LocationComponent } from './components/location/location.component';
import { RequestsComponent } from './components/requests/requests.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent, children: [
      { path: '', redirectTo: 'locations', pathMatch: 'full' },
      { path: 'locations', component: LocationsComponent },
      { path: 'location', component: LocationComponent }
    ] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: 'crud_location', component: CrudLocationComponent },
    { path: 'requests', component: RequestsComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
