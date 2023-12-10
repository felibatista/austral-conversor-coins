import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { URL_BACKEND } from '../lib/constants';
import { Conversion, Subscription } from '../lib/types';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  constructor(private cookieService: CookieService) { }

  async getSubscriptions(): Promise<Subscription[] | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const get = await fetch(URL_BACKEND + '/api/Subscription/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: Subscription[] = await get.json();

    return response;
  }
}