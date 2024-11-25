import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
  HttpHandlerFn) => {

    const loginUrl = environment.url + environment.prefixAuth + environment.login;
    const registroUrl = environment.url + environment.prefixAuth + environment.registro;

  if(req.url === loginUrl || (req.url === registroUrl && req.method === "POST")) {
    return next(req);
  }

  console.log(req.url);
  const token = localStorage.getItem("authToken")!;
  const modifiedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(modifiedReq);

};
