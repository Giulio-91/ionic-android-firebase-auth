import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.page.html',
	styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

	userEmail: string;

	constructor(
		private navCtrl: NavController,
    	private authService: AuthService
	) {}

	ngOnInit() {
		if(this.authService.userDetails()){
			this.userEmail = this.authService.userDetails().email;
			console.log('User: ', this.authService.userDetails())
		} else {
			this.navCtrl.navigateBack('');
		}

		// if(this.authService.getToken()) {
		// 	console.log('token: ', this.authService.getToken());
		// }
	}

	logout(){
		this.authService.logoutUser()
		.then(res => {
			console.log(res);
			this.navCtrl.navigateBack('');
		})
		.catch(error => {
			console.log(error);
		})
	}

}
