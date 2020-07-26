import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminComponent } from './components/admin/admin.component';
import { LocationsComponent } from './components/locations/locations.component';
import { CreateLocationComponent } from './components/crud-location/create-location/create-location.component';
import { UpdateLocationComponent } from './components/crud-location/update-location/update-location.component';
import { CrudLocationComponent } from './components/crud-location/crud-location.component';
import { LocationComponent } from './components/location/location.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { RequestsComponent } from './components/requests/requests.component';
import { SupplierRequestComponent } from './components/requests/supplier-request/supplier-request.component';
import { TagRequestComponent } from './components/requests/tag-request/tag-request.component';
import { ServiceRequestComponent } from './components/requests/service-request/service-request.component';
import { DeleteServiceRequestComponent } from './components/requests/delete-service-request/delete-service-request.component';
import { RequestProviderComponent } from './components/main/dialogs/requestProvider/requestProvider.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { MyServicesComponent } from './components/supplier/my-services/my-services.component';
import { NewTagComponent } from './components/supplier/my-services/dialogs/new-tag/new-tag.component';
import { NewServiceComponent } from './components/supplier/my-services/dialogs/new-service/new-service.component';
import { DeleteServiceComponent } from './components/supplier/my-services/dialogs/delete-service/delete-service.component';
import { CrudTagComponent } from './components/crud-tag/crud-tag.component';
import { ModifyServiceComponent } from './components/supplier/my-services/dialogs/modify-service/modify-service.component';
import { ManageTagsComponent } from './components/supplier/my-services/dialogs/manage-tags/manage-tags.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';

// Modules needed for GraphQL
import { HttpClientModule } from '@angular/common/http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InformationService } from './services/information.service';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { LayoutModule } from '@angular/cdk/layout';
import { ServiceComponent } from './components/service/service.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    LocationsComponent,
    SignupComponent,
    AdminComponent,
    CreateLocationComponent,
    UpdateLocationComponent,
    CrudLocationComponent,
    LocationComponent,
    DialogComponent,
    RequestProviderComponent,
    RequestsComponent,
    SupplierRequestComponent,
    TagRequestComponent,
    ServiceRequestComponent,
    DeleteServiceRequestComponent,
    SupplierComponent,
    MyServicesComponent,
    NewTagComponent,
    NewServiceComponent,
    DeleteServiceComponent,
    CrudTagComponent,
    ModifyServiceComponent,
    ManageTagsComponent,
    ServiceComponent,
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
    MatTabsModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatChipsModule,
    MatTableModule,
    HttpClientModule,     // Necesario para poder usar HttpLinkModule
    ApolloModule,         // Modulo principal de Apollo
    HttpLinkModule, LayoutModule, MatListModule, MatSelectModule,       // Necesario para obtener datos
  ],
  entryComponents: [
    RequestProviderComponent,
    NewTagComponent,
    NewServiceComponent,
    DeleteServiceComponent,
    ModifyServiceComponent,
    ManageTagsComponent,
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
