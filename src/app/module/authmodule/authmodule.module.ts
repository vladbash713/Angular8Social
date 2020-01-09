import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from '../../components/auth/signup/signup.component';
import { LoginComponent } from '../../components/auth/login/login.component';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { MaterialModule } from '../material/material.module';
import { AppRoutingModule } from './../../app-routing.module';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    AppRoutingModule,
    ToastrModule.forRoot() , // ToastrModule added
  ],
  entryComponents: [LoginComponent, SignupComponent]
})
export class AuthmoduleModule { }
