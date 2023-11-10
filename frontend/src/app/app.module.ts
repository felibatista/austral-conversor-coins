import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';	
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarModule } from './navbar/navbar.module';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { HeroComponent } from './hero/hero.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    FooterComponent,
    BrowserModule,
    AppRoutingModule,
    SliderModule,
    FormsModule,
    NavbarModule,
    OrganizationChartModule,
    ButtonModule,
    HeroComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
