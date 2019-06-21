import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

/** Reactive Forms */
import { ReactiveFormsModule } from '@angular/forms';

/** Pages */
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';
import { DashboardPage } from './dashboard/dashboard.page';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'login'
	},
	{
		path: 'register',
		component: RegisterPage
	},
	{
		path: 'login',
		component: LoginPage
	},
	{
		path: 'dashboard',
		component: DashboardPage
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes),
		ReactiveFormsModule
	],
	declarations: [
		LoginPage,
		RegisterPage,
		DashboardPage
	],
	providers: [
	]
})
export class AuthenticationPageModule {}
