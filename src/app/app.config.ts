import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { PlantaService } from './core/services/planta.service';
import { PaisService } from './core/services/pais.service';
import { NgxPaginationModule } from 'ngx-pagination';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideToastr({preventDuplicates: true, timeOut: 3000}),
    provideHttpClient(withInterceptors([tokenInterceptor, authInterceptor])),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: () => localStorage.getItem('authToken'),
        },
      })
    ),
    PlantaService,
    PaisService,
    NgxPaginationModule
  ]
};
