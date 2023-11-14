import { Component } from '@angular/core';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HeroComponent } from 'src/app/components/hero/hero.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    FooterComponent
  ],
})
export class HomeComponent {

}
