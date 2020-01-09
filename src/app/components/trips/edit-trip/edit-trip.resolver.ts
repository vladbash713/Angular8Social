import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { TripService } from 'src/app/shared/services/trip.service';

@Injectable()
export class EditTripResolver implements Resolve<any> {

  constructor(public tripService: TripService) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let trip_id = route.paramMap.get('id');
      this.tripService.getTrip(trip_id)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    })
  }
}