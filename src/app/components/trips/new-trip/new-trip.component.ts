import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { TripService } from 'src/app/shared/services/trip.service';
import { TripImgDialogComponent } from '../trip-img-dialog/trip-img-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.scss']
})
export class NewTripComponent implements OnInit {

  exampleForm: FormGroup;
  avatarLink: string = "https://wallpapercave.com/wp/dvbKFz3.jpg";

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
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      type: ['Tour', Validators.required],
      title: ['', Validators.required],
      price: [0],
      summary: ['', Validators.required],
      info: ['', Validators.required],
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(TripImgDialogComponent, {
      height: '400px',
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.avatarLink = result.url;
      }
    });
  }

  resetFields(){
    this.avatarLink = "https://wallpapercave.com/wp/dvbKFz3.jpg";
    this.exampleForm = this.fb.group({
      title: new FormControl('', Validators.required),
      price: new FormControl(0, Validators.required),
      summary: new FormControl('', Validators.required),
      info: new FormControl('', Validators.required),
    });
  }

  onSubmit(value){
    this.tripService.createTrip(value, this.avatarLink)
    .then(
      res => {
        this.toastrService.success('Successfully added!', "Notification");
        // this.router.navigate(['/trips']);
        this.resetFields();
      }
    )
    .catch(error => {
      console.log(error);
      this.toastrService.error('Failed to add a new Tour!', 'Error');
    });
  }
}
