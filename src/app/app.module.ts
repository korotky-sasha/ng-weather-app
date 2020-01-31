import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { reducers, metaReducers, effects } from './store';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { httpInterceptorProviders } from './core/http-interceptors';

import { AppComponent } from './app.component';
import { CityCardComponent } from './components/city-card/city-card.component';
import { ModalContainerComponent } from './components/modal-container/modal-container.component';
import { HostDirective } from './directives/host.directive';
import { DeleteCityComponent } from './components/delete-city/delete-city.component';
import { AddCityComponent } from './components/add-city/add-city.component';


@NgModule({
  declarations: [
    AppComponent,
    CityCardComponent,
    ModalContainerComponent,
    HostDirective,
    DeleteCityComponent,
    AddCityComponent
  ],
  entryComponents: [
    DeleteCityComponent,
    AddCityComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot(effects)
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
