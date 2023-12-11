import { Injectable } from '@angular/core';
import { URL_BACKEND } from '../lib/constants';
import { Subscription } from '../lib/types';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  async findPlan(id: number): Promise<Subscription | null> {
    const get = await fetch(URL_BACKEND + '/api/Subscription/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: Subscription = await get.json();

    return response;
  }
}
