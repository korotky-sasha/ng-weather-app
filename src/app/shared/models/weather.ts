export interface Weather {
  id: number;
  name: string;
  country: string;
  weather: { main: string, description: string, icon: string };
  mainWeather: { temp: number, feelsLike: number, pressure: number, humidity: number };
  wind: { speed: number, deg?: number };
  dt: number;
}
