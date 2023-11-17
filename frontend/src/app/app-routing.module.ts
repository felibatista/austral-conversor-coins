import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { onlyWithoutLoggedGuard } from './guards/onlyWithoutLogged.guard';
import { onlyLoggedGuard } from './guards/onlyLogged.guard';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Conversor | Inicio' },
  { path: 'home', component: HomeComponent, title: 'Conversor | Inicio' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
