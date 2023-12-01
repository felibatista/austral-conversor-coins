import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';

export const routes: Routes = [
    { path: 'admin', component: HomeComponent, title: 'Panel de control | Inicio' },
    { path: '', component: LoginComponent, title: 'Panel de control | Registro'}
];
