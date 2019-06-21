import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// import { AuthService } from './services/auth-service/auth.service';


@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html'
})
export class AppComponent  implements OnInit {

	user = null;

	public appPages = [
		{
			title: 'Home',
			url: '/home',
			icon: 'home'
		},
		{
			title: 'List',
			url: '/list',
			icon: 'list'
		},
		{
			title: 'Authentication',
            url: '/authentication',
            icon: 'contact'
		}
	];
	
	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		// private auth: AuthService
	) {
		this.initializeApp();
	}

	ngOnInit() {
		// this.auth.getAuthState().subscribe(
		// (user) => this.user = user);
	}
	
	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}
}
