import * as firebase from 'firebase';
// //initializing firebase
// //you firebase config here
var config = {
  apiKey: "api key",
  authDomain: "auth domain",
  databaseURL: "database URL",
  projectId: "project Id",
  storageBucket: "storage Bucket",
  messagingSenderId: "messaging Sender Id"
};

const fireBase = firebase.initializeApp(config);
export default fireBase;
