import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../services/login.service';

export const AuthGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const auth = inject(LoginService)
  const toast = inject(ToastrService);

  if(auth.isAuthenticated()) {
    return true;

  } else {
    toast.error("Debes estar autenticado para acceder a esta sesión", "Error");
    router.navigate(['/login']);
    return false;
  }
};
