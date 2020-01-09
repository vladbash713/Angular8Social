import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

import { Subscription } from 'rxjs';
import { AuthService } from './../../../shared/services/auth.service';
import { UIService } from './../../../shared/services/ui.service';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  @ViewChild(ToastContainerDirective, {static: true }) toastContainer: ToastContainerDirective;
  maxDate;
  returnbool: boolean;
  returnCode: string;
  email: string;
  password: string;
  displayname: string;
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(private router: Router,
              public auth: AuthService,
              private uiService: UIService,
              public toastr: ToastrService
              ) {

               }

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
    this.displayname = form.value.name;
    this.auth.signUp(this.email, this.password, this.displayname )
    .then(()=>{
      this.router.navigate(['/homepage']);
    }).catch( function(error) {
      console.log (error);
    });
  }

}

