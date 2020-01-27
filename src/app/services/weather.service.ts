import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { Weather } from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient
  ) { }

  getCityWeather(id): Observable<any> {
    const baseURL = 'http://api.openweathermap.org/data/2.5/weather';
    const appId = '&appid=04eaf40fd408c3adf01fd6b0a4a24575';
    const params = '?id=' + id;
    // console.log(`sending request to ${baseURL}${params}${appId}`);
    return this.http.get<any>(`${params}` );
  }

  getConvertedCityWeather(id): Observable<any> {
    const baseURL = 'http://api.openweathermap.org/data/2.5/weather';
    const appId = '&appid=04eaf40fd408c3adf01fd6b0a4a24575';
    const params = '?id=' + id;
    // console.log(`sending request to ${baseURL}${params}${appId}`);
    return this.http.get<any>(`${params}` ).pipe(
      map(response => {
      return this.convertResponse(response);
      })
    );
  }

  convertResponse(data) {
    const preparedCityData: Weather = {
      id: data.id,
      name: data.name,
      country: data.sys.country,
      weather: { main: data.weather[0].main, description: data.weather[0].description, icon: data.weather[0].icon },
      mainWeather: {
        temp: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        pressure: data.main.pressure,
        humidity: data.main.humidity
      },
      wind: { speed: data.wind.speed, deg: data.wind.deg },
      dt: data.dt
    };
    return preparedCityData;
  }
}
