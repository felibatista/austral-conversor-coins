import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { onlyWithoutLoggedGuard } from './guards/onlyWithoutLogged.guard';
import { onlyLoggedGuard } from './guards/onlyLogged.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Conversor | Home' },
  { path: 'home', component: HomeComponent, title: 'Conversor | Home' },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
