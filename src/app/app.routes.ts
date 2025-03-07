import { Routes } from '@angular/router';
import { LoginUserComponent } from './login-user/login-user.component';
import { FinanceDashboardComponent } from './finance-dashboard/finance-dashboard.component';

export const routes: Routes = [
    { path: 'login', component: LoginUserComponent },
    { path: 'dashboard', component: FinanceDashboardComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
