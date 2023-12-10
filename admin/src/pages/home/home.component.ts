import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PANELS, Panel } from '../../lib/panels';
import { CardComponent } from '../../components/card-panel/card.component';
import { CardCounterComponent } from '../../components/card-counter/card-counter.component';
import { CurrencyService } from '../../services/currency.service';
import { UserService } from '../../services/user.service';
import { StatusComponent } from '../status/status.component';
import { User } from '../../lib/types';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent, CardCounterComponent, StatusComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  panels: Panel[] = PANELS;
  user: User | null = null;

  usersCount: number = 0;
  currencyCount: number = 0;

  loaded: boolean = false;

  constructor(
    private userService: UserService,
    private currencyService: CurrencyService
  ) {}
  ngOnInit(): void {
    this.userService
      .getUserLogged()
      .then((user) => {
        if (user) {
          this.user = user;
          console.log(this.user);
        }
      })
      .then(() => {
        this.userService.getUsersCount().then((count) => {
          if (count) {
            this.usersCount = count;
          }
        });
      })
      .then(() => {
        this.currencyService.getCurrenciesCount().then((count) => {
          if (count) {
            this.currencyCount = count;
          }
        });
      })
      .finally(() => {
        this.loaded = true;
      });
  }
}
