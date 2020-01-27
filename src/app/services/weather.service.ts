import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Weather } from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient
  ) { }

  getCityWeather(id): Observable<any> {
    const params = '?id=' + id;
    return this.http.get<any>(`${params}` );
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
