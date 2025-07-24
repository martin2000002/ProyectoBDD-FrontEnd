import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private readonly baseUrl = 'https://<TU_URL>.supabase.co/rest/v1';
  private readonly apiKey = '<TU_SUPABASE_API_KEY>';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'apikey': this.apiKey,
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    });
  }

  get<T>(table: string, queryParams: string = ''): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${table}?${queryParams}`, {
      headers: this.getHeaders()
    });
  }

  insert<T>(table: string, body: T): Observable<any> {
    return this.http.post(`${this.baseUrl}/${table}`, body, {
      headers: this.getHeaders()
    });
  }

  update<T>(table: string, body: Partial<T>, matchQuery: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${table}?${matchQuery}`, body, {
      headers: this.getHeaders()
    });
  }

  delete(table: string, matchQuery: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${table}?${matchQuery}`, {
      headers: this.getHeaders()
    });
  }
}
