import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { City, CityMain, availableCities, chosenCities, weatherDataArr } from './mock-data';

import { WeatherService } from './services/weather.service';

// TODO: modal for live search
// TODO: use field 'selected' in availableCities instead of removing elements from it
// TODO: unique state for each user
// TODO: use NgRx store to hold the data

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  weatherDataArr = weatherDataArr;
  availableCities = availableCities.slice();
  chosenCities = chosenCities.slice();
  preparedDataArr: City[] = [];
  ascendingOrder = true;
  form: FormGroup;
  searchActive = false;
  searchHover = false;
  searchResults = [];
  searchFieldChanged: Subject <string> = new Subject <string> ();
  isModal = false;
  deleteCityConfirmed: Subject <boolean> = new Subject<boolean>();
  requestCounter = 0;
  requestCounter$ = new Subject<number>();
  requestQueue = [];

  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.prepareData();
    this.buildForm();
    this.sortCitiesByName();
    this.startLiveSearch();
    this.requestListener();
  }

  prepareData() {
    if (localStorage.getItem('weatherData')) {
      this.weatherDataArr = JSON.parse(localStorage.getItem('weatherData'));
    } else {
      this.setStore('weatherData', this.weatherDataArr);
    }
    if (localStorage.getItem('chosenCities')) {
      this.chosenCities = JSON.parse(localStorage.getItem('chosenCities'));
    } else {
      this.setStore('chosenCities', this.chosenCities);
    }
    if (localStorage.getItem('availableCities')) {
      this.availableCities = JSON.parse(localStorage.getItem('availableCities'));
    } else {
      this.setStore('availableCities', this.availableCities);
    }
    this.chosenCities.forEach( (value) => {
      this.getWeather(value.id);
    });
  }

  convertRawData(data) {
    const preparedCityData: City = {
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
      wind: { speed: data.wind.speed, deg: data.wind.deg }
    };
    return preparedCityData;
  }

  sortCitiesByName(toggle?) {
    if (toggle) {
      this.ascendingOrder = !this.ascendingOrder;
    }
    this.preparedDataArr.sort( (a, b) => {
      const order = this.ascendingOrder ? -1 : 1;
      if (a.name < b.name) {
        return order;
      } else {
        return -order;
      }
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  startLiveSearch() {
    this.searchFieldChanged
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe( (value) => {
        this.searchCity(value);
      });
  }

  searchCity(q: string) {
    this.searchResults = this.availableCities.filter((value) => {
      return value.name.toLowerCase().includes(q.toLowerCase());
    });
  }

  liveSearch(name) {
    this.searchFieldChanged.next(name);
  }

  getWeather(id) {
    this.checkWeatherTime(id);
    const isFind = this.weatherDataArr.find((data) => {
      if (data.id === id) {
        this.preparedDataArr.push(this.convertRawData(data));
        this.sortCitiesByName();
        return true;
      } else {
        return false;
      }
    });
    if (!isFind) {
      this.weatherService.getCity(id).subscribe( (value) => {
        console.log(value);
        const weather = value;
        this.weatherDataArr.push(weather);
        const stringData = JSON.stringify(this.weatherDataArr);
        localStorage.setItem('weatherData', stringData);
        this.preparedDataArr.push(this.convertRawData(weather));
        this.sortCitiesByName();
      });
    }
  }

  addCity(city: CityMain) {
    this.chosenCities.push(city);
    this.getWeather(city.id);
    this.availableCities.splice(this.availableCities.indexOf(city), 1);
    this.searchResults.splice(this.searchResults.indexOf(city), 1);
    this.setStore('availableCities', this.availableCities);
    this.setStore('chosenCities', this.chosenCities);
  }

  deleteCity(id: number) {
    this.chosenCities.map((value, index) => {
      if (value.id === id) {
        this.availableCities.push(value);
        this.chosenCities.splice(index, 1);
        return true;
      } else {
        return false;
      }
    });
    this.setStore('availableCities', this.availableCities);
    this.setStore('chosenCities', this.chosenCities);
    this.preparedDataArr.splice(this.preparedDataArr.indexOf(this.preparedDataArr.find( (value) => {
      return  value.id === id;
    })), 1);
  }

  tryDeleteCity(id: number) {
    this.isModal = true;
    const subscription = this.deleteCityConfirmed.subscribe( value => {
      if (value) {
        this.deleteCity(id);
      }
      this.isModal = false;
      subscription.unsubscribe();
    });
  }

  modalConfirmed() {
    this.deleteCityConfirmed.next(true);
  }

  modalClosed() {
    this.isModal = false;
    this.deleteCityConfirmed.next(false);
  }

  setStore(key, value) {
    const stringData = JSON.stringify(value);
    localStorage.setItem(`${key}`, stringData);
  }

  checkWeatherTime(id: number) {
    let arrIndex;
    const cityWeather = this.weatherDataArr.find( (data, index) => {
      if (data.id === id) {
        arrIndex = index;
      }
      return data.id === id;
    });
    if (cityWeather) {
      const weatherTime = new Date(cityWeather.dt * 1000);
      const currentTime = Date.now();
      const timeDifference = +weatherTime - currentTime;
      if (-timeDifference > 7200000) {
        console.log('Weather data for', cityWeather.name, 'is old and should be updated');
        // noinspection JSUnusedAssignment
        this.weatherDataArr.splice(arrIndex, 1);
      }
    }
  }

  fakeRequest(payload?) {
    if (this.requestCounter > 4) {
      console.log('Limit reached');
      this.requestQueue.push(payload);
    } else {
      console.log('Sending request');
      this.requestCounter++;
      this.requestCounter$.next(this.requestCounter);
      setTimeout( () => {
        this.requestCounter--;
        this.requestCounter$.next(this.requestCounter);
      }, 10000);
    }
  }

  requestListener() {
    this.requestCounter$.subscribe( value => {
      if (this.requestQueue.length > 0 && value < 5) {
        console.log(this.requestQueue.shift());
      }
    });
  }
}
