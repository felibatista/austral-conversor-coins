import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { onlyLoggedGuard } from '../guards/onlyLogged.guard';
import { onlyWithoutLoggedGuard } from '../guards/onlyWithoutLogged.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Inicio | Conversor' },
  { path: 'home', component: HomeComponent, title: 'Inicio | Conversor' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Información | Conversor',
    canActivate: [onlyLoggedGuard],
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
    title: 'Iniciar sesión | Conversor',
    canActivate: [onlyWithoutLoggedGuard],
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent,
    title: 'Registrarse | Conversor',
    canActivate: [onlyWithoutLoggedGuard],
  },
];
