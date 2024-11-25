import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const LoginGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const auth = inject(LoginService);

  if(auth.isAuthenticated()) {
    router.navigate(['/dashboard']);
    return false;

  }

  return true;

};
