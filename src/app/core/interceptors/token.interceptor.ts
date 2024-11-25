import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
  HttpHandlerFn) => {

  const router = inject(Router);
  const auth = inject(LoginService);
  const toast = inject(ToastrService);
  const loginUrl = environment.url + "auth/login";

  return next(req).pipe(catchError((err: HttpErrorResponse) => {

    if(err.status == 401 || !auth.isAuthenticated() && req.url != loginUrl) {
      console.log(req.url == loginUrl);
      toast.error("Tu token expiró", "¡Ups!");
      auth.logout();
      router.navigate(['/login']);
    }

    return throwError(() => err);

  }));
}
