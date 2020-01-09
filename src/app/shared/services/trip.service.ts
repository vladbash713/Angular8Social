import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

const TRIPS_DB = 'trips_db';
const TRIPS_IMG_DB = 'uploads';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(
    public db: AngularFirestore,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  addReviews(dt: any) {
    let reviews = dt.reviews ? dt.reviews : 0;
    let trip = { ...dt, reviews: Number(reviews) + 1 };
    this.updateTrip(dt.id, trip);
  }

  addRecommend(trip, id) {
    if (this.authService.isLoggedIn !== true) {
      this.toastr.warning('You need to login', 'Login');
      return;
    }
    let recommend = trip.recommend ? trip.recommend : 0;
    let data = { ...trip, recommend: Number(recommend) + 1 };
    console.log(data);
    this.updateTrip(id, data);
  }
  addFeedback(trip) {
    if (this.authService.isLoggedIn !== true) {
      this.toastr.warning('You need to login', 'Login');
      return;
    }
    let feedback = trip.feedback ? trip.feedback : 0;
    let data = { ...trip, feedback: Number(feedback) + 1 };
    this.updateTrip(trip.id, data);
  }


  getAvatars() {
    return this.db.collection(TRIPS_IMG_DB).valueChanges()
  }

  getTrip(tripKey) {
    return this.db.collection(TRIPS_DB).doc(tripKey).snapshotChanges();
  }

  updateTrip(tripKey, value) {
    const user = this.authService.currentUser;
    const data = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,

      ...value,
      _title: value.title,
      updated: new Date()
    }
    return this.db.collection(TRIPS_DB).doc(tripKey).set(data);
  }

  deleteTrip(tripKey) {
    return this.db.collection(TRIPS_DB).doc(tripKey).delete();
  }

  getTrips() {
    return this.db.collection(TRIPS_DB, ref => ref.orderBy('title')).snapshotChanges();
  }

  getItems(item_type) {
    return this.db.collection(TRIPS_DB, ref => ref.where('type', '==', item_type)).snapshotChanges();
  }

  getHomepageItems(item_type) {
    return this.db.collection(TRIPS_DB, ref => ref.where('type', '==', item_type)
          .limit(4)).snapshotChanges();
  }

  getAllTrips() {
    return this.db.collection(TRIPS_DB).valueChanges();
  }

  searchTrips(searchValue) {
    return this.db.collection(TRIPS_DB, ref => ref.where('_title', '>=', searchValue)
      .where('_title', '<=', searchValue + '\uf8ff'))
      .snapshotChanges();
  }

  searchTripsByAge(value) {
    return this.db.collection(TRIPS_DB, ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }


  createTrip(value, avatar) {

    const user = this.authService.currentUser;


    return this.db.collection(TRIPS_DB).add({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,

      ...value,
      _title: value.title,
      avatar: avatar,

      created: new Date()
    });
  }
}
