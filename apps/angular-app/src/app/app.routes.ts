import { Routes } from '@angular/router';

import { DefaultLayoutComponent } from '~shared/components/layouts/default-layout/default-layout.component';
import { DashboardComponent } from 'features/dashboard/dashboard.component';
import { LoginComponent } from 'features/login/login.component';
import { TrainingListComponent } from 'features/trainings/training-list/training-list.component';
import { MyTrainingsComponent } from 'features/trainings/my-trainings/my-trainings.component';

// TODO:
// find more efficient way to use layout component once user is loggedin here in routing
export const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: '',
		component: DefaultLayoutComponent,
		children: [
			{
				path: 'dashboard',
				component: DashboardComponent,
			},
			{
				path: 'manage-trainings',
				component: TrainingListComponent
			},
			// User
			{
				path: 'my-trainings',
				component: MyTrainingsComponent
			},
		]
	},
	{ path: '**', redirectTo: 'login' },
];
