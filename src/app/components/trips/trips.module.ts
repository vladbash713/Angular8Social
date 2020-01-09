import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripsComponent } from './trips.component';
import { NewTripComponent } from './new-trip/new-trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { TripImgDialogComponent } from './trip-img-dialog/trip-img-dialog.component';
import { Routes, RouterModule } from '@angular/router';
import { TripsRoutingModule } from './trips-routing.module';
import { MaterialModule } from 'src/app/module/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailTripComponent } from './detail-trip/detail-trip.component';
import { TripCommentComponent } from './trip-comment/trip-comment.component';
import { TripListComponent } from './trip-list/trip-list.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';

@NgModule({
  declarations: [
    TripsComponent,
    NewTripComponent,
    EditTripComponent,
    TripImgDialogComponent,
    DetailTripComponent,
    TripCommentComponent,
    TripListComponent,
    HotelListComponent,
    RestaurantListComponent],
  imports: [
    CommonModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,

    TripsRoutingModule
  ]
})
export class TripsModule { }
