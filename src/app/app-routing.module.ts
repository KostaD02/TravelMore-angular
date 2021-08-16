import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './views/home-page/home-page.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { ApartmentsComponent } from './views/apartments/apartments.component';
import { AuthorizationComponent } from './views/authorization/authorization.component';
import { BookComponent } from './views/book/book.component';
import { HelpComponent } from './views/help/help.component';
import { DashbordComponent } from './views/dashbord/dashbord.component';
import { SettingsComponent } from './views/settings/settings.component';
import { RegisterComponent } from './views/register/register.component';
import { UploadAppartmentComponent } from './views/upload-appartment/upload-appartment.component';
import { SaleComponent } from './views/sale/sale.component';
import { YourHotelsComponent } from './views/your-hotels/your-hotels.component';
import { EditHotelComponent } from './views/your-hotels/my-hotel/edit-hotel/edit-hotel.component';
import { AddRoomComponent } from './views/your-hotels/my-hotel/add-room/add-room.component';
import { SearchComponent } from './views/search/search.component';
import { ReservationComponent } from './views/reservation/reservation.component';
const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'hotel/:name', component: ApartmentsComponent },
  { path: 'hotel/:name/:id', component: BookComponent },
  { path: 'hotel-add-appartment/:name/:key', component: AddRoomComponent },
  { path: 'hotel-edit/:name/:key', component: EditHotelComponent },
  { path: 'hotels', component: YourHotelsComponent },
  { path: 'search/:result', component: SearchComponent },
  { path: 'sale', component: SaleComponent },
  { path: 'reservation/:name/:key', component: ReservationComponent },
  { path: 'upload', component: UploadAppartmentComponent },
  { path: 'authorization', component: AuthorizationComponent },
  { path: 'authorization/register', component: RegisterComponent },
  { path: 'help', component: HelpComponent },
  { path: 'dashboard', component: DashbordComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
