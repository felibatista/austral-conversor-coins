import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'any',
})
export class AuthService {
  private url = 'https://localhost:7265';

  constructor(private cookieService: CookieService, private userService: UserService) {}

  async isLogged(){
    return await this.userService.getUser().then((user) => {
      if (user) {
        return true;
      }

      return false;
    });
  }

  logout() {
    this.cookieService.delete('token');
    this.userService.setUser({
      id: 0,
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      subscriptionId: 0,
    });
  }

  async authenticate(username: string, password: string) {
    const post = await fetch(this.url + '/api/Authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const response = await post.json();

    if (response.token) {
      this.cookieService.set('token', response.token);

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
