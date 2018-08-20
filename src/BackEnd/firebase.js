import * as firebase from 'firebase';
// //initializing firebase
// //you firebase config here
var config = {
  apiKey: "key",
  authDomain: "domain",
  databaseURL: "url",
  projectId: "id",
  storageBucket: "store",
  messagingSenderId: "id"
};

const fireBase = firebase.initializeApp(config);
export default fireBase;
