import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { TripService } from 'src/app/shared/services/trip.service';

@Component({
  selector: 'app-trip-img-dialog',
  templateUrl: './trip-img-dialog.component.html',
  styleUrls: ['./trip-img-dialog.component.scss']
})
export class TripImgDialogComponent implements OnInit {

  avatars: Array<any> = new Array<any>();

  constructor(
    public dialogRef: MatDialogRef<TripImgDialogComponent>,
    public firebaseService: TripService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.firebaseService.getAvatars()
    .subscribe(data => this.avatars = data);
  }

  close(avatar){
    this.dialogRef.close(avatar);
  }
}
