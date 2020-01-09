import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { TripService } from 'src/app/shared/services/trip.service';
import { TripImgDialogComponent } from '../trip-img-dialog/trip-img-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.scss']
})
export class EditTripComponent implements OnInit {
  
  exampleForm: FormGroup;
  item: any;

  validation_messages = {
   'title': [
     { type: 'required', message: 'Title is required.' }
   ]
 };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public tripService: TripService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if(data){
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    });
  }

  createForm() {
    this.exampleForm = this.fb.group({
      type: [this.item.type, Validators.required],
      title: [this.item.title, Validators.required],
      price: [this.item.price],
      summary: [this.item.summary, Validators.required],
      info: [this.item.info, Validators.required],
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(TripImgDialogComponent, {
      height: '400px',
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.item.avatar = result.url;
      }
    });
  }

  resetFields(){
    this.exampleForm = this.fb.group({
      type: new FormControl('Tour', Validators.required),
      title: new FormControl('', Validators.required),
      price: new FormControl(0, Validators.required),
      summary: new FormControl('', Validators.required),
      info: new FormControl('', Validators.required),
    });
  }

  onSubmit(value){
    const data = {...this.item, ...value}
    this.tripService.updateTrip(this.item.id, data)
    .then(
      res => {
        this.toastrService.success('Successfully updated!', "Notification");
        this.router.navigate(['/tours']);
      }
    )
    .catch(error => {
      console.log(error);
      this.toastrService.error('Failed to update a Tour!', 'Error');
    });
  }
}
