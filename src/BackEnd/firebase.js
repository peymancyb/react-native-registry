import * as firebase from 'firebase';
// //initializing firebase
// //you firebase config here
var config = {
  apiKey: "AIzaSyB6zCdAALy1I4efyNNua8irEJ6UTaeqR-M",
  authDomain: "myapp-5c82d.firebaseapp.com",
  databaseURL: "https://myapp-5c82d.firebaseio.com",
  projectId: "myapp-5c82d",
  storageBucket: "myapp-5c82d.appspot.com",
  messagingSenderId: "814712128036"
};

const FB = firebase.initializeApp(config);
export default FB;
