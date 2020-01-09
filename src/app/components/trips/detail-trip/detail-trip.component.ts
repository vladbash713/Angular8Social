import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { TripService } from 'src/app/shared/services/trip.service';
import { TripImgDialogComponent } from '../trip-img-dialog/trip-img-dialog.component';
import { TripCommentService } from 'src/app/shared/services/trip-comment.service';
import { DefaultComponent } from 'src/app/shared/common/default-component';

@Component({
  selector: 'app-detail-trip',
  templateUrl: './detail-trip.component.html',
  styleUrls: ['./detail-trip.component.scss']
})
export class DetailTripComponent extends DefaultComponent implements OnInit {

  exampleForm: FormGroup;
  item: any;
  comments: any;

  validation_messages = {
   'name': [
     { type: 'required', message: 'Name is required.' }
   ],
   'surname': [
     { type: 'required', message: 'Surname is required.' }
   ],
   'age': [
     { type: 'required', message: 'Age is required.' },
   ]
 };

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private tripService: TripService,
    private commentService: TripCommentService,
    private route: ActivatedRoute,
  ) { 
    super();
  }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if(data){
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.tripService.addReviews(this.item);
        this.commentService.getCommentsByTrip(this.item.id).subscribe(
          data => {
            this.comments = data;
          }
        );
      }
    });
    
  }

}
