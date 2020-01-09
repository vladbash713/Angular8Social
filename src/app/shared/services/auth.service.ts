
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { User } from '../model/user';

@Injectable({providedIn: 'root'})
export class AuthService {
  userData: any;
  
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone

  ) {
    this.afAuth.authState.subscribe(user => {
      if(user){
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  signIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(()=> {
          this.router.navigate(['homepage']);
        });
        this.setUserData(result.user);
      }).catch((error) => {
        console.log(error.message);
      });
  }

  signUp(email, password, displayName) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result)=> {
        // this.sendVerificationMail();
        console.log(result);
        this.setUserData({...result.user, displayName: displayName});
      }).catch((error) => {
        console.log(error.message);
      })
  }

  sendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(()=>{
        this.router.navigate(['verify-email-address']);
      })
  }

  forgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(()=> {
        console.log('Password reset email sent, check your inbox.');
      }).catch((error) => {
        console.log(error);
      })
  }

  get currentUser(){
    return JSON.parse(localStorage.getItem('user'));
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false)? true: false;
  }

  get currentDisplayname(): string {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false)? user.displayName: 'Unknown';
  }
  get currentPhotoURL(): string{
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.photoURL)? user.photoURL: 'https://cdn.pixabay.com/photo/2016/10/07/12/35/man-1721463_960_720.png';
  }

  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  authLogin(provider) {
    provider.addScope('profile');
    provider.addScope('email');
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        this.ngZone.run(()=> {
          this.router.navigate(['homepage']);
        })
        this.setUserData(result.user);
      }).catch((error) => {
        console.log(error);
      })
  }

  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    })
  }

  signOut(){
    return this.afAuth.auth.signOut().then(()=> {
      localStorage.removeItem('user');
      this.router.navigate(['homepage']);
    })
  }
}
