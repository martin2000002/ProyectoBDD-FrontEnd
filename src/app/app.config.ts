import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { initializeAppCheck, provideAppCheck, ReCaptchaV3Provider } from '@angular/fire/app-check';
import { environment } from '../environments/environment';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appCheckInterceptor } from './core/interceptors/app-check.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),

    provideAppCheck(() =>
      initializeAppCheck(undefined, {
        provider: new ReCaptchaV3Provider('6Ld_a4orAAAAAMbsht4bgvty8cyJnpX9_5EHBXgx'),
        isTokenAutoRefreshEnabled: true
      })
    ),

    provideHttpClient(
      withInterceptors([appCheckInterceptor])
    ),
  ]
};
