import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { URL_BACKEND } from '../lib/constants';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private cookieService: CookieService) {}

  logout() {
    this.cookieService.delete('token');
    window.document.location.href = '/';
  }

  isLogged() {
    if (!this.cookieService.get('token')) {
      return false;
    }

    const token = this.cookieService.get('token').split('.');
    const user = JSON.parse(atob(token[1]));
    const role = user.role;
    //expiracion del token
    const exp = user.exp;

    if (exp < Date.now() / 1000) {
      this.logout();
      return false;
    }

    return true;
  }

  async register(
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    const post = await fetch(URL_BACKEND + '/api/Authenticate/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
    });

    if (post.status !== 200) {
      return {
        message: 'Error',
        success: false,
      };
    }

    const response = await post.json();

    if (response.token) {
      const token = response.token.split('.');
      const user = JSON.parse(atob(token[1]));
      const role = user.role;

      this.cookieService.set('token', response.token);
      window.document.location.href = '/';

      return {
        message: response.token,
        success: true,
      };
    }

    return {
      message: response.error,
      success: false,
    };
  }

  async authenticate(username: string, password: string) {
    const post = await fetch(URL_BACKEND + '/api/Authenticate/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (post.status !== 200) {
      return {
        message: 'Error',
        success: false,
      };
    }

    const response = await post.json();

    if (response.token) {
      const token = response.token.split('.');
      const user = JSON.parse(atob(token[1]));
      const role = user.role;

      this.cookieService.set('token', response.token);
      window.document.location.href = '/';

      return {
        message: response.token,
        success: true,
      };
    }

    return {
      message: response.error,
      success: false,
    };
  }
}
