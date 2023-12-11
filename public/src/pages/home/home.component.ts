import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { CurrencyService } from '../../services/currency.service';
import { Conversion, Currency, Subscription, User } from '../../lib/types';
import { ConversionsService } from '../../services/conversions.service';
import { ConversorComponent } from '../../components/conversor/conversor.component';
import { SubscriptionService } from '../../services/plan.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [ConversorComponent],
})
export class HomeComponent implements OnInit {
  currencies: Currency[] = [];
  conversions: Conversion[] = [];
  user: User | null = null;
  plan: Subscription | null = null;

  currencyCount: number = 0;
  loading: boolean = true;

  constructor(
    private userService: UserService,
    private currencyService: CurrencyService,
    private subscriptionService: SubscriptionService,
    private conversionsService: ConversionsService
  ) {}

  async ngOnInit(): Promise<void> {
    const currenciesGet = await this.currencyService.getCurrencies();
    const count = await this.currencyService.getCurrenciesCount();

    if (currenciesGet) {
      this.currencies = currenciesGet;
    }

    if (count) {
      this.currencyCount = count;
    }

    const userGet = await this.userService.getUserLogged();

    if (!userGet) {
      this.loading = false;

      return;
    }

    this.user = userGet;

    const conversionsGet = await this.conversionsService.getConversionsUser(
      this.user.id
    );

    if (conversionsGet) {
      this.conversions = conversionsGet;
    }

    const planGet = await this.subscriptionService.findPlan(this.user.subscription.id);

    if (planGet) {
      this.plan = planGet;
    }

    this.loading = false;
  }
}
