import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

const COMMENTS_DB = 'comments_db';

@Injectable({
  providedIn: 'root'
})
export class TripCommentService {

  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  getCommentsByUser(user_id) {
    return this.db.collection(COMMENTS_DB, ref => ref.where('uid', '==', user_id))
    .snapshotChanges();
  }
  getCommentsByTrip(trip_id) {
    return this.db.collection(COMMENTS_DB, ref => ref.where('trip_id', '==', trip_id))
      .snapshotChanges();
  }

  addComment(value, trip_id) {
    if(this.authService.isLoggedIn !== true) {
      this.toastr.warning('You need to login', 'Login');
      return;
    }
    const user = this.authService.currentUser;
    return this.db.collection(COMMENTS_DB).add({
      ...value,
      uid: user.uid,
      trip_id: trip_id,
      name: user.displayName,
      photoURL: user.photoURL,
      created: new Date()
    });
  }
}
