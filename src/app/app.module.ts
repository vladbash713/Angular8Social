import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from './module/material/material.module';
import { AuthmoduleModule } from './module/authmodule/authmodule.module';


// Firebase imports
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage'
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ToastrModule } from 'ngx-toastr';

// Services
import { AuthService } from './shared/services/auth.service';
import { NotifyService } from './shared/services/notify.service';
import { UIService } from './shared/services/ui.service';

// user Component
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { TripsModule } from './components/trips/trips.module';
import { TripImgDialogComponent } from './components/trips/trip-img-dialog/trip-img-dialog.component';
import { TripService } from './shared/services/trip.service';
import { FormUploadComponent } from './components/form-upload/form-upload.component';
import { FormUploadModule } from './components/form-upload/form-upload.module';
import { EditTripResolver } from './components/trips/edit-trip/edit-trip.resolver';
import { TripCommentService } from './shared/services/trip-comment.service';
import { TripViewService } from './shared/services/trip-view.service';
import { TripRecommendService } from './shared/services/trip-recommend.service';

const APP_MODULES = [
  TripsModule,
  FormUploadModule,
  AppRoutingModule,
  MaterialModule,
  AuthmoduleModule
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    UserprofileComponent,
    FormUploadComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), // ToastrModule added
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    
    FormsModule,
    ReactiveFormsModule,

    ...APP_MODULES,
  ],
  entryComponents: [
    TripImgDialogComponent
  ],
  providers: [
    TripService,
    TripCommentService,
    TripViewService,
    TripRecommendService,
    AuthService,
    NotifyService,
    UIService,
    EditTripResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
