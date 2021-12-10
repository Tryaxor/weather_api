import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment as env } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather(query: string): Observable<any> {
    //env.config.f
    return this.http.get<any>(
      env.config.feedRoot + '&units=' + env.config.units + '&q=' + query
    );
  }
}
