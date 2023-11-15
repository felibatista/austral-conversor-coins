import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Conversion } from 'src/app/types/conversion';
import { Foreing } from 'src/app/types/foreing';
import { Plan } from 'src/app/types/plan';
import { User } from 'src/app/types/user';

@Injectable({
  providedIn: 'any',
})
export class UserService {
  user: User | null = null;
  conversions: WritableSignal<Conversion[]> = signal([]);
  plan: WritableSignal<Plan> = signal({
    id: 0,
    name: '',
    price: 0,
    limit: 0,
  });

  private url = 'https://localhost:7265';

  constructor(private cookieService: CookieService) {}

  setUser(user: User) {
    this.user = user;
  }

  async getConversions(): Promise<Conversion[] | null> {
    //LOAD FROM CACHE
    if (this.conversions().length > 0) {
      return this.conversions();
    }

    const user = await this.getUser();

    if (!user) {
      return null;
    }

    //si está el usuario, entonces hay token
    const token = this.cookieService.get('token');

    //GET CONVERSIONS
    const conversions: Conversion[] = await fetch(
      this.url + '/api/Conversion/' + user.id + '?limit=0',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }
    ).then((res) => res.json());

    if (conversions.length > 0) {
      conversions.forEach((conversion) => {
        conversion.date = new Date(conversion.date);
      });
      this.conversions.set(conversions);
      return conversions;
    }

    return [];
  }

  async postConversion(
    from: Foreing,
    to: Foreing,
    amount: number
  ): Promise<Conversion | null> {
    const user = await this.getUser();

    console.log(user);

    if (!user) {
      return null;
    }

    const token = this.cookieService.get('token');

    const response = await fetch(this.url + '/api/Conversion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        userId: user.id,
        fromForeingId: from.id,
        toForeingId: to.id,
        amount: amount,
      }),
    }).then((res) => res.json());

    if (response.id) {
      const conversion: Conversion = {
        id: response.id,
        fromForeingId: from.id,
        toForeingId: to.id,
        date: new Date(),
        amount: amount,
      };

      this.conversions.update((conversions) => {
        conversions.push(conversion);
        return conversions;
      });

      return conversion;
    }

    return null;
  }

  async getPlan(): Promise<Plan | null> {
    //LOAD FROM CACHE
    if (this.plan().id > 0) {
      return this.plan();
    }

    const user = await this.getUser();

    if (!user) {
      return null;
    }

    const token = this.cookieService.get('token');

    const plan: Plan = await fetch(this.url + '/api/Subscription/' + user.subscriptionId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }).then((res) => res.json());

    if (plan.id) {
      this.plan.set(plan);
      return plan;
    }

    return null;
  }

  async getUser(): Promise<User | null> {
    //LOAD FROM CACHE
    if (this.user !== null) {
      return this.user;
    }

    //LOAD USER FROM TOKEN
    const token = this.cookieService.get('token');

    if (!token) {
      return null;
    }

    //GET USERID FROM TOKEN
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const userId = JSON.parse(decodedPayload).userId;

    if (!userId) {
      return null;
    }

    //GET USER FROM USERID
    const user = await fetch(this.url + '/api/User/' + userId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }).then((res) => res.json());

    console.log(user)

    if (user.id) {
      this.setUser(user);
      return user;
    }

    return null;
  }
}
