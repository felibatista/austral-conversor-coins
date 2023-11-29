import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { onlyLoggedGuard } from '../guards/onlyLogged.guard';
import { onlyWithoutLoggedGuard } from '../guards/onlyWithoutLogged.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Conversor | Inicio' },
  { path: 'home', component: HomeComponent, title: 'Conversor | Inicio' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Conversor | Dashboard',
    canActivate: [onlyLoggedGuard],
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
    title: 'Conversor | Login',
    canActivate: [onlyWithoutLoggedGuard],
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent,
    title: 'Conversor | Registro',
    canActivate: [onlyWithoutLoggedGuard],
  },
];
