import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { ObservableStore } from '@codewithdan/observable-store';

if (environment.production) {
  enableProdMode();
}

ObservableStore.initializeState({});
ObservableStore.globalSettings = { isProduction: environment.production };

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
