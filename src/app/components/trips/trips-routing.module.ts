import { Routes, RouterModule, Router } from "@angular/router";
import { TripsComponent } from './trips.component';
import { NewTripComponent } from './new-trip/new-trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { NgModule } from '@angular/core';
import { EditTripResolver } from './edit-trip/edit-trip.resolver';
import { DetailTripComponent } from './detail-trip/detail-trip.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { TripCommentComponent } from './trip-comment/trip-comment.component';
import { TripListComponent } from './trip-list/trip-list.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';

const routes: Routes = [
  {
    path: 'tour-list', component: TripListComponent,
  },
  {
    path: 'hotel-list', component: HotelListComponent,
  },
  {
    path: 'restaurant-list', component: RestaurantListComponent,
  },
  {
    path: 'tours', component: TripsComponent,
  },
  {
    path: 'tour_new', component: NewTripComponent, canActivate:[AuthGuard]
  },
  {
    path: 'tours/edit/:id', component: EditTripComponent, resolve: {data: EditTripResolver}, canActivate: [AuthGuard]
  },
  {
    path: 'tours/detail/:id', component: DetailTripComponent, resolve: {data: EditTripResolver}
  },
  {
    path: 'tours/comment/:id', component: TripCommentComponent, resolve: {data: EditTripResolver}, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripsRoutingModule { }
