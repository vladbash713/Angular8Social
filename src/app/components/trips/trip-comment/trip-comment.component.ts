import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TripService } from 'src/app/shared/services/trip.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TripCommentService } from 'src/app/shared/services/trip-comment.service';
import { DefaultComponent } from 'src/app/shared/common/default-component';

@Component({
  selector: 'app-trip-comment',
  templateUrl: './trip-comment.component.html',
  styleUrls: [
    './trip-comment.component.scss',
    '../detail-trip/detail-trip.component.scss'
  ]
})
export class TripCommentComponent extends DefaultComponent implements OnInit {

  exampleForm: FormGroup;
  item: any;
  
  validation_messages = {
   'summary': [
     { type: 'required', message: 'Summary is required.' }
   ],
   'content': [
     { type: 'required', message: 'Content is required.' }
   ]
 };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public tripService: TripService,
    public toastrService: ToastrService,
    private commentService: TripCommentService,
    private route: ActivatedRoute
  ) { 
    super();
  }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if(data){
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    });
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      summary: ['', Validators.required ],
      content: ['', Validators.required ],
    });
  }

  onSubmit(value){
    this.commentService.addComment(value, this.item.id)
    .then(
      res => {
        this.toastrService.success('Successfully added!', "Notification");
        this.router.navigate(['/trips/detail/'+this.item.id]);
        this.tripService.addFeedback(this.item);
      }
    )
    .catch(error => {
      console.log(error);
      this.toastrService.error('Failed to add a new Tour!', 'Error');
    });
  }

}
