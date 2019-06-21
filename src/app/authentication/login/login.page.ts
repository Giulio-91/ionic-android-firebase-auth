import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth-service/auth.service';



@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	constructor(
		private navCtrl: NavController,
		private authService: AuthService,
		private formBuilder: FormBuilder,
	) { }

	validations_form: FormGroup;
	errorMessage = '';

	validation_messages = {
		email: [
			{ type: 'required', message: 'Email is required.' },
			{ type: 'pattern', message: 'Please enter a valid email.' }
		],
		password: [
			{ type: 'required', message: 'Password is required.' },
			{ type: 'minlength', message: 'Password must be at least 5 characters long.' }
		]
	};

	ngOnInit() {
		this.validations_form = this.formBuilder.group({
			email: new FormControl('', Validators.compose([
				Validators.required,
				Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
			])),
			password: new FormControl('', Validators.compose([
				Validators.minLength(5),
				Validators.required
			])),
		});
	}


	loginUser(value) {
		this.authService.loginUser(value)
		.then(res => {
			console.log(res);
			this.errorMessage = '';
			this.navCtrl.navigateForward('/authentication/dashboard');
		}, err => {
			this.errorMessage = err.message;
		});
	}

	/**
	 * Login with Google
	 */
	loginWithGoogle() {
		this.authService.loginWithGoogle();
	}

	goToRegisterPage() {
		this.navCtrl.navigateForward('/authentication/register');
	}


}
