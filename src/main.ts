import themes from 'devextreme/ui/themes';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'devextreme-intl';
import * as messagesPt from './pt.json';
import config from 'devextreme/core/config';
import { loadMessages, locale } from 'devextreme/localization';

if (environment.production) {
  enableProdMode();
}
config({
   defaultCurrency: 'BRL',
   decimalSeparator: ',',
   thousandsSeparator: '.'
});

loadMessages(messagesPt.default);
locale('pt');

themes.initialized(() => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
});
