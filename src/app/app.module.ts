import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminComponent } from './components/admin/admin.component';
import { RegionsComponent } from './components/regions/regions.component';
import { AddRegionComponent } from './components/add-region/add-region.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// Modules needed for GraphQL
import { HttpClientModule } from '@angular/common/http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InformationService } from './services/information.service';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    RegionsComponent,
    SignupComponent,
    AdminComponent,
    AddRegionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDLWrWE4G9kg3_O1quNgo3toVhJ7dTFEC8'
    }),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatSlideToggleModule,
    HttpClientModule,     // Necesario para poder usar HttpLinkModule
    ApolloModule,         // Modulo principal de Apollo
    HttpLinkModule, LayoutModule, MatListModule,       // Necesario para obtener datos
  ],
  providers: [InformationService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public apollo: Apollo,
              public httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri: 'https://catalogo-servicio-digital.herokuapp.com'}),
      cache: new InMemoryCache()
    });
  }
}
