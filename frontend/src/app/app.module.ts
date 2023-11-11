import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';	
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarModule } from './components/navbar/navbar.module';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { HeroComponent } from './components/hero/hero.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';  
import { CommonModule } from '@angular/common';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    FooterComponent,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    SliderModule,
    FormsModule,
    NavbarModule,
    OrganizationChartModule,
    ButtonModule,
    HttpClientModule,
    HeroComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
