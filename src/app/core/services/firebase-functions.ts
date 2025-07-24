import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseFunctionsService {
  private functionUrls: Record<string, string> = {
    getDistribucionComidas: 'https://getdistribucioncomidas-wronjupuqq-uc.a.run.app',
    getObjetivos: 'https://getobjetivos-wronjupuqq-uc.a.run.app',
    getRangosNutricionales: 'https://getrangosnutricionales-wronjupuqq-uc.a.run.app',
    getPosiblesProductos: 'https://getposiblesproductos-wronjupuqq-uc.a.run.app',
    generarMenu: 'https://generarmenu-wronjupuqq-uc.a.run.app'
  };

  constructor(private http: HttpClient) {}

  callFunction<T>(functionName: string, options?: { params?: Record<string, any>; headers?: HttpHeaders; }): Observable<T>;
  callFunction(functionName: string, options: { params?: Record<string, any>; headers?: HttpHeaders; responseType: 'text'; }): Observable<string>;
  callFunction(functionName: string, options: { params?: Record<string, any>; headers?: HttpHeaders; responseType: 'blob'; }): Observable<Blob>;
  callFunction<T>(functionName: string, options: { method: 'GET' | 'POST' | 'PUT' | 'DELETE'; params?: Record<string, any>; headers?: HttpHeaders; body?: any; responseType?: 'json' | 'text' | 'blob'; }): Observable<T>;

  callFunction(functionName: string, options: any = {}): Observable<any> {
    const url = this.functionUrls[functionName];
    if (!url) throw new Error(`Function URL not configured for: ${functionName}`);

    const method = options.method || 'GET';
    const params = options.params ? new HttpParams({ fromObject: options.params }) : undefined;
    const headers = options.headers;

    if (method === 'GET') {
      return this.http.get(url, { params, headers, responseType: options.responseType || 'json' });
    } else if (method === 'POST') {
      return this.http.post(url, options.body, { params, headers, responseType: options.responseType || 'json' });
    } else if (method === 'PUT') {
      return this.http.put(url, options.body, { params, headers, responseType: options.responseType || 'json' });
    } else if (method === 'DELETE') {
      return this.http.delete(url, { params, headers, responseType: options.responseType || 'json' });
    } else {
      throw new Error(`Unsupported HTTP method: ${method}`);
    }
  }
}