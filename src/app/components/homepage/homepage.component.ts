import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TripService } from 'src/app/shared/services/trip.service';
import { DefaultComponent } from 'src/app/shared/common/default-component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent extends DefaultComponent implements OnInit {


  toursList: any;
  hotelList: any;
  restaurantList: any;

  constructor(
    private tripService: TripService
  ) { 
    super();
  }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.tripService.getHomepageItems('Tour')
    .subscribe(result => {
      this.toursList = result;
    })
    this.tripService.getHomepageItems('Hotel')
    .subscribe(result => {
      this.hotelList = result;
    })
    this.tripService.getHomepageItems('Restaurant')
    .subscribe(result => {
      this.restaurantList = result;
    })
  }

}
