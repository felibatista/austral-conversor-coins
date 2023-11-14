import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const onlyWithoutLoggedGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isLogged().then((res) => {
    if (res) {
      router.navigateByUrl('/home');
      return false;
    }
    return true;
  });
};
