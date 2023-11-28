import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UserService } from '../../services/user/user.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeroComponent } from '../../components/hero/hero.component';

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
export class HomeComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getPlan().then((plan) => {
      if (plan) {
        this.userService.plan.set(plan);

        this.userService.getConversions().then((conversions) => {
          if (conversions) {
            this.userService.conversions.set(conversions);
          }
        });
      }
    });
  }
}
