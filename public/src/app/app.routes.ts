import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { loggedGuard } from '../guards/loggedGuard.guard';
import { notLoggedGuard } from '../guards/notLoggedGuard.guard';

/*{
  path: 'dashboard',
  //component: DashboardComponent,
  title: 'Información | Conversor',
  canActivate: [loggedGuard],
},*/
export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Inicio | Conversor' },
  { path: 'home', component: HomeComponent, title: 'Inicio | Conversor' },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
    title: 'Iniciar sesión | Conversor',
    canActivate: [notLoggedGuard],
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent,
    title: 'Registrarse | Conversor',
    canActivate: [notLoggedGuard],
  },
];
