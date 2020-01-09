import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
    public authService: AuthService, // make this is a public property so you can bind it to html and
    // use it as an observable with async pipe. -rshetty
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialoglogin(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      panelClass: 'custom-dialog-container',
      width: '400px'
    });
    // this.dialModalRef.updatePosition({ top: '50px', left: '50px' });

    dialogRef.afterClosed().subscribe(result => {
      // this.router.navigateByUrl('userprofile');
      console.log('The dialog was closed');
    });
  }

  openDialogsignup(): void {
    const dialogRef = this.dialog.open(SignupComponent, {
      panelClass: 'custom-dialog-container',
      width: '400px'
    });
    // this.dialModalRef.updatePosition({ top: '50px', left: '50px' });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  getUser() {
    return this.authService.currentDisplayname;
  }

  getUserPhoto() {
    return this.authService.currentPhotoURL;
  }

  Userlogout() {
    this.authService.signOut();
    this.router.navigate(['/']);
  }

  UsertobeloggedOut() {
    const userlog = 'Sign Out - ' + this.authService.currentDisplayname;
    return userlog;
  }

  triggerUserProfile() {
    console.log('userprofile');
    return this.router.navigateByUrl('userprofile');
  }

  triggertakeacourse() {
    console.log('triggertakeacourse');
    return this.router.navigateByUrl('takeacourse');
  }

  triggerBlog() {
    console.log('triggerBlog');
    return this.router.navigateByUrl('Blog');
  }
}
