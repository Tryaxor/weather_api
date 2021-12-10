import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CityHistoryService } from './city-history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'weather';
  weatherInfo: any = null;
  response: any = null;
  cities: string[] = [];

  query: string = '';

  constructor(
    private weatherService: WeatherService,
    private historyService: CityHistoryService
  ) {}

  search(): void {
    this.weatherService
      .getWeather(this.query)
      .pipe(catchError(this.handleError<any>('getWeather', null)))
      .subscribe((data: any) => {
        if (data) {
          if (this.cities.indexOf(data.name) == -1) {
            this.historyService.pushCity(data.name);
          } else {
            this.historyService.deleteCity(this.cities.indexOf(data.name));
            this.historyService.pushCity(data.name);
          }
          while (this.historyService.getCities().length > 10) {
            this.historyService.deleteCity(0);
          }
          this.response = null;
          this.weatherInfo = data;
          this.cities = this.historyService.getCities();
        }
      });
  }

  searchCity(city: string) {
    this.query = city;
    this.search();
  }

  deleteCity(i: number){
    this.historyService.deleteCity(i);
    this.cities = this.historyService.getCities();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.response = error; // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  ngOnInit() {
    this.cities = this.historyService.getCities();
  }
}
