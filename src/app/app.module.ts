import { environment } from 'src/environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { SideBarComponent } from './shared-components/side-bar/side-bar.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { HelpComponent } from './views/help/help.component';
import { AuthorizationComponent } from './views/authorization/authorization.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { ApartmentsComponent } from './views/apartments/apartments.component';
import { SettingsComponent } from './views/settings/settings.component';
import { BookComponent } from './views/book/book.component';
import { DashbordComponent } from './views/dashbord/dashbord.component';
import { RegisterComponent } from './views/register/register.component';
import { UploadAppartmentComponent } from './views/upload-appartment/upload-appartment.component';
import { SaleComponent } from './views/sale/sale.component';
import { HotelComponent } from './views/home-page/hotel/hotel.component';
@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    HomePageComponent,
    HelpComponent,
    AuthorizationComponent,
    NotFoundComponent,
    ApartmentsComponent,
    SettingsComponent,
    BookComponent,
    DashbordComponent,
    RegisterComponent,
    UploadAppartmentComponent,
    SaleComponent,
    HotelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
