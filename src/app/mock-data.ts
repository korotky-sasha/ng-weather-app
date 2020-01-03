import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class City {
  id: number;
  name: string;
  country: string;
  weather: { main: string, description: string, icon: string };
  mainWeather: { temp: number, feelsLike: number, pressure: number, humidity: number };
  wind: { speed: number, deg: number };
}

export interface CityMain {
  id: number;
  name: string;
  country: string;
}

export const weatherDataArr = [
  {
    coord: {lon: -0.13, lat: 51.51},
    weather: [{id: 801, main: 'Clouds', description: 'few clouds', icon: '02d'}],
    base: 'stations',
    main: {temp: 276.13, feels_like: 271.58, temp_min: 273.71, temp_max: 278.71, pressure: 1010, humidity: 93},
    visibility: 10000,
    wind: {speed: 4.1, deg: 160},
    clouds: {all: 20},
    dt: 1576658040,
    sys: {type: 1, id: 1412, country: 'GB', sunrise: 1576656110, sunset: 1576684325},
    timezone: 0,
    id: 2643743,
    name: 'London',
    cod: 200
  },
  {
    coord: {lon: 2.35, lat: 48.85},
    weather: [{id: 741, main: 'Fog', description: 'fog', icon: '50d'}],
    base: 'stations',
    main: {temp: 277.74, feels_like: 275.06, temp_min: 276.15, temp_max: 279.26, pressure: 1015, humidity: 100},
    visibility: 6000,
    wind: {speed: 2.1, deg: 160},
    clouds: {all: 33},
    dt: 1576658221,
    sys: {type: 1, id: 6550, country: 'FR', sunrise: 1576654761, sunset: 1576684483},
    timezone: 3600,
    id: 2988507,
    name: 'Paris',
    cod: 200
  },
  {
    coord: {lon: 13.41, lat: 52.52},
    weather: [{id: 801, main: 'Clouds', description: 'few clouds', icon: '02d'}],
    base: 'stations',
    main: {temp: 283.07, feels_like: 279.06, temp_min: 282.04, temp_max: 283.71, pressure: 1014, humidity: 71},
    visibility: 10000,
    wind: {speed: 4.1, deg: 300},
    clouds: {all: 20},
    dt: 1576658342,
    sys: {type: 1, id: 1275, country: 'DE', sunrise: 1576653175, sunset: 1576680758},
    timezone: 3600,
    id: 2950159,
    name: 'Berlin',
    cod: 200
  },
  {
    coord: {lon: 16.37, lat: 48.21},
    weather: [{id: 701, main: 'Mist', description: 'mist', icon: '50d'}, {id: 741, main: 'Fog', description: 'fog', icon: '50d'}],
    base: 'stations',
    main: {temp: 277.11, feels_like: 275.43, temp_min: 274.82, temp_max: 281.15, pressure: 1019, humidity: 100},
    visibility: 4500,
    wind: {speed: 0.5},
    clouds: {all: 40},
    dt: 1576658177,
    sys: {type: 1, id: 6878, country: 'AT', sunrise: 1576651228, sunset: 1576681284},
    timezone: 3600,
    id: 2761369,
    name: 'Vienna',
    cod: 200
  },
  {
    coord: {lon: 30.52, lat: 50.43},
    weather: [{id: 800, main: 'Clear', description: 'clear sky', icon: '01d'}],
    base: 'stations',
    main: {temp: 279.78, feels_like: 276.48, temp_min: 278.15, temp_max: 281.48, pressure: 1017, humidity: 87},
    visibility: 9000,
    wind: {speed: 3, deg: 240},
    clouds: {all: 3},
    dt: 1576658176,
    sys: {type: 1, id: 8903, country: 'UA', sunrise: 1576648432, sunset: 1576677287},
    timezone: 7200,
    id: 703448,
    name: 'Kiev',
    cod: 200
  },
];

export const chosenCities = [
  {id: 2643743,
    name: 'London',
    country: 'GB', },
  {id: 2988507,
    name: 'Paris',
    country: 'FR', },
  {id: 2950159,
    name: 'Berlin',
    country: 'DE', },
  {id: 2761369,
    name: 'Vienna',
    country: 'AT', },
  {id: 703448,
    name: 'Kiev',
    country: 'UA', },
];

export const availableCities = [
  {id: 3067696,
    name: 'Prague',
    country: 'CZ', },
  {id: 2759794,
    name: 'Amsterdam',
    country: 'NL', },
  {id: 3054643,
    name: 'Budapest',
    country: 'HU', },
  {id: 703845,
    name: 'Kryvyy Rih',
    country: 'UA', },
  {id: 709930,
    name: 'Dnipropetrovsk',
    country: 'UA', },
  {id: 712160,
    name: 'Bilhorod-Dnistrovskyy',
    country: 'UA', },
  {id: 711660,
    name: 'Boryspil',
    country: 'UA', },
  {id: 711390,
    name: 'Brovary',
    country: 'UA', },
  {id: 698159,
    name: 'Otradnoye',
    country: 'UA', },
  {id: 713191,
    name: 'Artek',
    country: 'UA', },
  {id: 687700,
    name: 'Zaporizhzhya',
    country: 'UA', },
  {id: 702550,
    name: 'Lviv',
    country: 'UA', },
  {id: 706483,
    name: 'Kharkiv',
    country: 'UA', },
  {id: 698740,
    name: 'Odessa',
    country: 'UA', },
  {
    id: 707860,
    name: 'Hurzuf',
    country: 'UA', },
  {
    id: 519188,
    name: 'Novinki',
    country: 'RU',
  },
  {
    id: 1283378,
    name: 'Gorkhā',
    country: 'NP',
  },
  {
    id: 1270260,
    name: 'State of Haryāna',
    country: 'IN',
  },
  {
    id: 708546,
    name: 'Holubynka',
    country: 'UA',
  },
  {
    id: 1283710,
    name: 'Bāgmatī Zone',
    country: 'NP',
  },
  {
    id: 529334,
    name: 'Mar’ina Roshcha',
    country: 'RU',
  },
  {
    id: 1283240,
    name: 'Kathmandu',
    country: 'NP',
  },
  {
    id: 703363,
    name: 'Laspi',
    country: 'UA',
  },
  {
    id: 3632308,
    name: 'Merida',
    country: 'VE',
  },
  {
    id: 473537,
    name: 'Vinogradovo',
    country: 'RU',
  },
  {
    id: 384848,
    name: 'Qarah Gawl al ‘Ulyā',
    country: 'IQ',
  },
  {
    id: 569143,
    name: 'Cherkizovo',
    country: 'RU',
  },
  {
    id: 713514,
    name: 'Alupka',
    country: 'UA',
  },
  {
    id: 2878044,
    name: 'Lichtenrade',
    country: 'DE',
  },
  {
    id: 464176,
    name: 'Zavety Il’icha',
    country: 'RU',
  },
  {
    id: 295582,
    name: '‘Azriqam',
    country: 'IL',
  },
  {
    id: 1271231,
    name: 'Ghūra',
    country: 'IN',
  },
  {
    id: 690856,
    name: 'Tyuzler',
    country: 'UA',
  },
  {
    id: 464737,
    name: 'Zaponor’ye',
    country: 'RU',
  },
  {
    id: 707716,
    name: 'Il’ichëvka',
    country: 'UA',
  },
  {
    id: 697959,
    name: 'Partyzans’ke',
    country: 'UA',
  },
  {
    id: 803611,
    name: 'Yurevichi',
    country: 'RU',
  },
  {
    id: 614371,
    name: 'Gumist’a',
    country: 'GE',
  },
  {
    id: 874560,
    name: 'Ptitsefabrika',
    country: 'GE',
  },
  {
    id: 874652,
    name: 'Orekhovo',
    country: 'GE',
  },
  {
    id: 2347078,
    name: 'Birim',
    country: 'NG',
  },
  {
    id: 2051302,
    name: 'Priiskovyy',
    country: 'RU',
  },
  {
    id: 563692,
    name: 'Dzhaga',
    country: 'RU',
  },
  {
    id: 481725,
    name: 'Tret’ya Rota',
    country: 'RU',
  },
  {
    id: 2638976,
    name: 'Ruislip',
    country: 'GB',
  },
  {
    id: 2892705,
    name: 'Karow',
    country: 'DE',
  },
  {
    id: 2922336,
    name: 'Gatow',
    country: 'DE',
  },
  {
    id: 975511,
    name: 'Mkuze',
    country: 'ZA',
  },
  {
    id: 1280737,
    name: 'Lhasa',
    country: 'CN',
  },
  {
    id: 745042,
    name: 'İstanbul',
    country: 'TR',
  },
  {
    id: 3496831,
    name: 'Mao',
    country: 'DO',
  },
  {
    id: 2045761,
    name: 'De-Friz',
    country: 'RU',
  },
  {
    id: 1257986,
    name: 'Rumbak',
    country: 'IN',
  },
  {
    id: 476350,
    name: 'Vavibet',
    country: 'RU',
  },
  {
    id: 1343000,
    name: 'Surtagān Chib',
    country: 'PK',
  },
  {
    id: 456169,
    name: 'Rīgas Rajons',
    country: 'LV',
  },
  {
    id: 475279,
    name: 'Verkhneye Shchekotikhino',
    country: 'RU',
  },
  {
    id: 711349,
    name: 'Bucha',
    country: 'UA',
  },
  {
    id: 3094325,
    name: 'Kuchary',
    country: 'PL',
  },
  {
    id: 6255149,
    name: 'North America',
    country: '',
  },
  {
    id: 3575514,
    name: 'Brumaire',
    country: 'KN',
  },
  {
    id: 1861387,
    name: 'Ishikawa-ken',
    country: 'JP',
  },
  {
    id: 1857578,
    name: 'Matoba',
    country: 'JP',
  },
  {
    id: 1299298,
    name: 'Pya',
    country: 'MM',
  },
  {
    id: 3256023,
    name: 'Kalanac',
    country: 'BA',
  },
  {
    id: 2921044,
    name: 'Federal Republic of Germany',
    country: 'DE',
  },
  {
    id: 2861876,
    name: 'Land Nordrhein-Westfalen',
    country: 'DE',
  },
  {
    id: 802899,
    name: 'Mutaykutan',
    country: 'RU',
  },
  {
    id: 523523,
    name: 'Nalchik',
    country: 'RU',
  },
  {
    id: 546448,
    name: 'Kolganov',
    country: 'RU',
  },
  {
    id: 500023,
    name: 'Rybatskiy',
    country: 'RU',
  },
  {
    id: 2207349,
    name: 'Bellara',
    country: 'AU',
  },
  {
    id: 7870412,
    name: 'Bartlett',
    country: 'ZA',
  },
  {
    id: 961935,
    name: 'Rietfontein',
    country: 'ZA',
  },
  {
    id: 3371200,
    name: 'Hardap',
    country: 'NA',
  },
  {
    id: 1016666,
    name: 'Botswana',
    country: 'ZA',
  },
  {
    id: 3858204,
    name: 'El Destierro',
    country: 'AR',
  },
  {
    id: 4070245,
    name: 'Jones Crossroads',
    country: 'US',
  },
  {
    id: 4344544,
    name: 'Vernon Parish',
    country: 'US',
  },
  {
    id: 4215307,
    name: 'Pennick',
    country: 'US',
  },
  {
    id: 5285039,
    name: 'Black Bear Spring',
    country: 'US',
  },
  {
    id: 4673179,
    name: 'Bee House',
    country: 'US',
  },
  {
    id: 6078447,
    name: 'Morden',
    country: 'CA',
  },
  {
    id: 2201316,
    name: 'Nasirotu',
    country: 'FJ',
  },
  {
    id: 1938756,
    name: 'Sisali',
    country: 'ID',
  },
  {
    id: 2009359,
    name: 'Puntan',
    country: 'ID',
  },
  {
    id: 2566086,
    name: 'Tsiémé-Mandiélé',
    country: 'CG',
  },
  {
    id: 154733,
    name: 'Masama',
    country: 'TZ',
  },
  {
    id: 1630349,
    name: 'Purukcahu',
    country: 'ID',
  },
  {
    id: 2224928,
    name: 'Néméyong II',
    country: 'CM',
  },
  {
    id: 6716279,
    name: 'Pondok Genteng',
    country: 'ID',
  },
  {
    id: 2384618,
    name: 'Mbongoté',
    country: 'CF',
  },
  {
    id: 378867,
    name: 'Amiling',
    country: 'SS',
  },
  {
    id: 2230362,
    name: 'Kélkoto',
    country: 'CM',
  },
  {
    id: 343846,
    name: 'Angetu',
    country: 'ET',
  },
  {
    id: 370366,
    name: 'Massa',
    country: 'SD',
  },
  {
    id: 365618,
    name: 'Tumko',
    country: 'SD',
  },
  {
    id: 524894,
    name: 'Moskva',
    country: 'RU',
  },
  {
    id: 1861060,
    name: 'Japan',
    country: 'JP',
  },
  {
    id: 2130037,
    name: 'Hokkaidō',
    country: 'JP',
  },
];
