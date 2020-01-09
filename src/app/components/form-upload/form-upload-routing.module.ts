import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { FormUploadComponent } from './form-upload.component';

const routes: Routes = [
  {
    path: 'files', component: FormUploadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormUploadRoutingModule { }
