// src/app/core/interceptors/app-check.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AppCheck, getToken } from '@angular/fire/app-check';
import { from, switchMap } from 'rxjs';

export const appCheckInterceptor: HttpInterceptorFn = (req, next) => {
  const appCheck = inject(AppCheck);

  return from(getToken(appCheck)).pipe(
    switchMap(tokenResult => {
      const cloned = req.clone({
        setHeaders: {
          'X-Firebase-AppCheck': tokenResult.token
        }
      });
      return next(cloned);
    })
  );
};
