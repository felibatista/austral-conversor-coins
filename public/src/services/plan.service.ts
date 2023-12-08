import { Injectable } from '@angular/core';
import { URL_BACKEND } from '../lib/constants';
import { CookieService } from 'ngx-cookie-service';
import { Plan, User } from '../lib/types';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  async findPlan(id: number): Promise<Plan | null> {
    const get = await fetch(URL_BACKEND + '/api/Subscription/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: Plan = await get.json();

    return response;
  }
}