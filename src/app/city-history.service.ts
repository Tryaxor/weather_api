import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CityHistoryService {
  getCities(): string[] {
    return this.getData();
  }

  pushCity(city: string) {
    let cities = this.getData();
    cities.push(city);
    this.setData(cities);
  }

  deleteCity(index: number) {
    let cities = this.getData();
    cities.splice(index, 1);
    this.setData(cities);
  }

  setData(data: string[]) {
    const jsonData = JSON.stringify(data);
    localStorage.setItem('cities', jsonData);
  }

  getData(): string[] {
    return JSON.parse(localStorage.getItem('cities') ?? '[]');
  }
  constructor() {}
}
