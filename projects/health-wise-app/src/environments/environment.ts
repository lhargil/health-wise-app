// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IEnvironment } from './ienvironment';

export const environment: IEnvironment = {
  production: false,
  useLocalApi: false,
  healthWiseUrl: 'https://localhost:5001',
  testUser: '6d21c451-43f8-4d72-375d-08d83df69139',
  authConfig: {
    clientRoot: process.env.HEALTHWISE_AUTHCONFIG_CLIENTROOT || '',
    apiRoot: process.env.HEALTHWISE_AUTHCONFIG_APIROOT || '',
    stsAuthority: process.env.HEALTHWISE_AUTHCONFIG_STSAUTHORITY || '',
    clientId: process.env.HEALTHWISE_AUTHCONFIG_CLIENTID || '',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
