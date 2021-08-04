// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseCollections: {
    users: 'user-collection',
    helpMessages: 'users-helps-messages',
    hotels: 'hotel-collection',
  },
  firebaseConfig: {
    apiKey: 'AIzaSyD6QPSM_qpn5w11puDD2BU1Hnp_U9C7OvY',
    authDomain: 'travelmore-a0675.firebaseapp.com',
    databaseURL:
      'https://travelmore-a0675-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'travelmore-a0675',
    storageBucket: 'travelmore-a0675.appspot.com',
    messagingSenderId: '169072495648',
    appId: '1:169072495648:web:e451c2a13dd1eb7db60045',
    measurementId: 'G-PCJ5T3X42S',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
