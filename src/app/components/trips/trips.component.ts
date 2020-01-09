import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/shared/services/trip.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DefaultComponent } from 'src/app/shared/common/default-component';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent extends DefaultComponent implements OnInit {

  searchValue: string = "";
  items: Array<any>;
  result; any;

  constructor(
    public tripService: TripService,
    private router: Router,
    private toastr: ToastrService
  ) { 
    super();
  }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.tripService.getTrips()
    .subscribe(result => {
      this.items = result;
      this.result = this.items;
    })
  }

  editDetails(item){
    this.router.navigate(['/tours/edit/'+ item.payload.doc.id]);
  }

  remove(item){
    this.tripService.deleteTrip(item.payload.doc.id)
    .then(() => {
      this.toastr.success('Removed file!', "Notification");
      this.getData();
    })
    .catch(error => {
      console.log(error);
      this.toastr.error('Failed to remove file!', 'Error');
    });
  }

  capitalizeFirstLetter(value){
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByName(){
    let value = this.searchValue.toLowerCase();
    if(value.length ==0){
      this.items = this.result;
      return;
    }
    this.items = this.result.filter(data => {
      const item = data.payload.doc.data();
      return item.title.toLowerCase().indexOf(value) >=0 || 
              item.displayName.toLowerCase().indexOf(value) >=0 || 
              item.summary.toLowerCase().indexOf(value) >=0 || 
              item.info.toLowerCase().indexOf(value) >=0
    })
  }
}
