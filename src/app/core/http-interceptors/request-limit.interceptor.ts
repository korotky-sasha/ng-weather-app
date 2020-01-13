import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import {Observable, timer} from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable()
export class RequestLimitInterceptor implements HttpInterceptor {
  requestCounter = 0;
  requestQueue = [];

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const baseWidth = environment.baseWidth; // calls
    const baseTime = environment.baseTime; // per time in milliseconds
    const currentTime = Date.now();
    if (this.requestCounter >= baseWidth) {
      console.log('Limit reached', new Date());
      const num = this.requestQueue.length % baseWidth;
      const shift = this.requestQueue[num] ? this.requestQueue[num] : 0;
      const multiplier = Math.floor(this.requestQueue.length / baseWidth);
      const delay = baseTime * multiplier - (currentTime - shift);
      console.log(this.requestQueue[0], currentTime, 'sending request with delay ', delay);
      this.requestQueue.push(currentTime + delay);
      return this.sendRequest(request, next, delay);
    } else {
      console.log('Sending request at', currentTime);
      this.requestCounter++;
      this.requestQueue.push(currentTime);
      setTimeout( () => {
        this.requestCounter--;
        this.requestQueue.shift();
      }, baseTime);
      return  this.sendRequest(request, next);
    }
  }

  sendRequest(request: HttpRequest<any>, next: HttpHandler, delay: number = 0) {
    const appId = environment.appId;
    const baseUrl = environment.baseUrl;
    const newRequest = request.clone({
      url: `${baseUrl}${request.url}${appId}`
    });
    return timer(delay).pipe(         // <== Wait few milliseconds
      switchMap( () => next.handle(newRequest) )   // <== Switch to the Http Stream
    );
  }
}
