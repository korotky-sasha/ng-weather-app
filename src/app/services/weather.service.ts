import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient
  ) { }

  getCity(id): Observable<any> {
    const baseURL = 'http://api.openweathermap.org/data/2.5/weather';
    const appId = '&appid=04eaf40fd408c3adf01fd6b0a4a24575';
    const params = '?id=' + id;
    console.log(`sending request to ${baseURL}${params}${appId}`);
    // return this.http.get<any>(`${baseURL}${params}${appId}` );
    return this.http.get<any>(`${params}` );
  }
}
