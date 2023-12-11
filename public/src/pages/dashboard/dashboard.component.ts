import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCurrenciesComponent } from '../../components/dashboard-currencies/dashboard-currencies.component';
import { ConversionsService } from '../../services/conversions.service';
import { CurrencyService } from '../../services/currency.service';
import { Currency, Conversion, Subscription, User } from '../../lib/types';
import { UserService } from '../../services/user.service';
import { DashboardMonthComponent } from '../../components/dashboard-month/dashboard-month.component';
import { DashboardGridTopComponent } from '../../components/dashboard-grid-top/dashboard-grid-top.component';
import { SubscriptionService } from '../../services/plan.service';
import { DashboardPlanComponent } from '../../components/dashboard-plan/dashboard-plan.component';
import { DashboardConversionsComponent } from '../../components/dashboard-conversions/dashboard-conversions.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DashboardCurrenciesComponent,
    DashboardMonthComponent,
    DashboardGridTopComponent,
    DashboardPlanComponent,
    DashboardConversionsComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  currencies: Currency[] = [];
  userConversions: Conversion[] = [];
  userSubscription: Subscription = {} as Subscription;
  user: User = {} as User;

  loading: boolean = true;

  constructor(
    private conversionService: ConversionsService,
    private currencyService: CurrencyService,
    private userService: UserService,
    private subscriptionService: SubscriptionService
  ) {}

  async ngOnInit(): Promise<void> {
    const currencies = await this.currencyService.getCurrencies();

    if (currencies) {
      this.currencies = currencies;
    }

    const user = await this.userService.getUserLogged();

    if (!user) {
      return;
    }

    this.user = user;

    const userConversions = await this.conversionService.getConversionsUser(
      user.id
    );

    if (userConversions) {
      this.userConversions = userConversions;
    }

    const userSubscription = await this.subscriptionService.findPlan(user.subscription.id)

    if (userSubscription) {
      this.userSubscription = userSubscription;
    }

    this.loading = false;
  }
}
