import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminComponent } from './components/admin/admin.component';
import { CrudLocationComponent } from './components/crud-location/crud-location.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: 'crud_location', component: CrudLocationComponent, children: [
      { path: 'create', loadChildren: 'app/lazy/create.module#LazyCreateModule' },
      { path: 'update', loadChildren: 'app/lazy/update.module#LazyUpdateModule' }
    ]}
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
