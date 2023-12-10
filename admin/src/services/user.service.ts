import { Injectable } from '@angular/core';
import { URL_BACKEND } from '../lib/constants';
import { CookieService } from 'ngx-cookie-service';
import { User, UserForUpdate } from '../lib/types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private cookieService: CookieService) {}

  async getUserLogged(): Promise<User | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const token = this.cookieService.get('token').split('.');
    const user = JSON.parse(atob(token[1]));
    const id = user.userId;

    const get = await fetch(URL_BACKEND + '/api/User/id/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: User = await get.json();

    return response;
  }

  async getUsers(): Promise<User[] | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const get = await fetch(URL_BACKEND + '/api/User/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: User[] = await get.json();

    return response;
  }

  async getUsersPage(page: number): Promise<User[] | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const get = await fetch(URL_BACKEND + '/api/User/page/' + page, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: User[] = await get.json();

    return response;
  }

  async findUser(input: string): Promise<User[] | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const get = await fetch(URL_BACKEND + '/api/User/find/' + input, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: User[] = await get.json();

    return response;
  }

  async getUsersCount(): Promise<number | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const get = await fetch(URL_BACKEND + '/api/User/counter', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: number = await get.json();

    return response;
  }

  async updateUser(user: UserForUpdate): Promise<boolean> {
    if (!this.cookieService.get('token')) {
      return false;
    }

    //update user
    const putUser = await fetch(URL_BACKEND + '/api/User/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
      body: JSON.stringify({
        id: user.id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
      }),
    });

    if (putUser.status !== 200) {
      return false;
    }

    //update subscription
    const putSubscription = await fetch(URL_BACKEND + '/api/User/subscription/' + user.id + "?subscriptionId=" + user.subscriptionId , {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (putSubscription.status !== 200) {
      return false;
    }

    return true;
  }

  async deleteUser(id: number): Promise<boolean> {
    if (!this.cookieService.get('token')) {
      return false;
    }

    const deleteUser = await fetch(URL_BACKEND + '/api/User/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (deleteUser.status !== 200) {
      return false;
    }

    return true;
  }
}
