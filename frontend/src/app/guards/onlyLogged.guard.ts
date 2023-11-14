import { inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';


export const onlyLoggedGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isLogged().then((res) => {
    if (!res) {
      router.navigate(['login']);
      return false
    }
    return true;
  });
};
