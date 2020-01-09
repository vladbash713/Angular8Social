import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormUploadRoutingModule } from './form-upload-routing.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormUploadRoutingModule,
    ToastrModule.forRoot()
  ]
})
export class FormUploadModule { }
