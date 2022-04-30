import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment.prod';
import firebase from 'firebase/compat/app';
import 'firebase/compat/app';

if (environment.production) {
  enableProdMode();
}

firebase.initializeApp(environment.firebase);
let appInit = false;
firebase.auth().onAuthStateChanged(() => {
  if(!appInit) {
    platformBrowserDynamic().bootstrapModule(AppModule)
      .catch(err => console.error(err));
  }
  appInit = true;

});
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
