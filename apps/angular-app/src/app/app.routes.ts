import { Routes } from '@angular/router';

import { DashboardComponent } from 'features/dashboard/dashboard.component';
import { LoginComponent } from 'features/login/login.component';

export const routes: Routes = [
	{
		path: 'dashboard',
		component: DashboardComponent,
	},
	{
		path: 'login',
		component: LoginComponent,
	},
];
