import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


// Firebase
import * as firebase from 'firebase/app';

// AngularFireAuth.user provides you an Observable<User|null> to monitor your application's authentication State.
// AngularFireAuth.auth returns an initialized firebase.auth.Auth instance, allowing you to log users in, out, etc.
import { AngularFireAuth } from '@angular/fire/auth';
// auth provides an instance of firebase.auth
import { auth } from 'firebase/app';

import * as models from '../../authentication/models/auth.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private authState: Observable<firebase.User>;
	private currentUser: firebase.User = null;

	constructor(
		public afAuth: AngularFireAuth
	) {
		this.authState = this.afAuth.authState;
    	this.authState.subscribe(user => {
			if (user) {
				this.currentUser = user;
			} else {
				this.currentUser = null;
			}
		});
	}

	/**
	 * Return suth state
	 */
	getAuthState() {
		// return this.authState;
	}

	/*
	 * Register with firebase
	 */
	registerUser(value: models.User){
		return new Promise<any>((resolve, reject) => {
			firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
			.then(res => resolve(res), err => reject(err))
		});
	}

	/**
	 * Login with firebase
	 */
	loginUser(value){
		return new Promise<any>((resolve, reject) => {
			firebase.auth().signInWithEmailAndPassword(value.email, value.password)
			.then(res => resolve(res), err => reject(err));
		});
	}

	/**
	 * Login with Google
	 */
	loginWithGoogle() {
		const provider = new auth.GoogleAuthProvider();
		this.afAuth.auth.signInWithPopup(provider)
		.then( (result: any) => { // (function(result: any) {
            if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // let token = result.credential.accessToken;
                // ...
            }
        }).catch(function(error) {
            // // Handle Errors here.
            // let errorCode = error.code;
            // let errorMessage = error.message;
            // // The email of the user's account used.
            // let email = error.email;
            // // The firebase.auth.AuthCredential type that was used.
            // let credential = error.credential;
            // // ...
        });
	}

	/** 
	 * Logout
	 */
	logoutUser(){
		return new Promise((resolve, reject) => {
			if(firebase.auth().currentUser){
				firebase.auth().signOut()
				.then(() => {
					console.log("LOG Out");
					resolve();
				}).catch((error) => {
					reject();
				});
			}
		})
	}

	userDetails(){
		return firebase.auth().currentUser;
	}

	/**
	 * Get token @ionic-native/firebase-authentication 
	 */
	getToken() {
		// return new Promise<any>((resolve, reject) => {
		// 	this.firebaseAuthentication.getIdToken()
		// 	.then(res => resolve(res), err => reject(err))
		// });
		// return this.firebaseAuthentication.getIdToken(true)
	}


}
