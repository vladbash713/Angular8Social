import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

import { AuthService } from '../../../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { UIService } from '../../../shared/services/ui.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild(ToastContainerDirective, { static: true }) toastContainer: ToastContainerDirective;
  email: string;
  password: string;
  isLoading = false;
  private loadingSubs: Subscription;
  constructor(
    public auth: AuthService,
    private uiService: UIService,
    private dialogRef: MatDialogRef<LoginComponent>,
    public toastr: ToastrService) { }

  ngOnInit() {
    this.toastr.overlayContainer = this.toastContainer;
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  onSubmit(form: NgForm) {
    this.email = form.value.email;
    this.password = form.value.password;

    console.log('before call:' + this.email + ' ' + this.password);

    this.auth.signIn(
      this.email, this.password
    );

  }

  googleclick() {
    this.auth.googleAuth().then(()=>{
      this.toastr.success('You have been logged in our app.', 'Conguratlation!');
      this.dialogRef.close();
    }).catch((error) => {
      console.log(error);

    });
  }

  Twitterclick() {
    console.log('Twitter authentication');
    // this.auth.twitterLogin();
  }

  Facebookclick() {
    console.log('Facebook authentication');
    // this.auth.facebookLogin();
  }
}


