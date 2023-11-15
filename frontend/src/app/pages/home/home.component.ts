import { Component, OnInit } from '@angular/core';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HeroComponent } from 'src/app/components/hero/hero.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { UserService } from 'src/app/services/user/user.service';

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
