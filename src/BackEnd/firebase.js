import * as firebase from 'firebase';
//initializing firebase
const config = {
  apiKey: "AIzaSyB6zCdAALy1I4efyNNua8irEJ6UTaeqR-M",
  authDomain: "myapp-5c82d.firebaseapp.com",
  databaseURL: "https://myapp-5c82d.firebaseio.com",
  projectId: "myapp-5c82d",
  storageBucket: "myapp-5c82d.appspot.com",
  messagingSenderId: "814712128036"
};
const FB = firebase.initializeApp(config);
// const storage = firebase.storage();
// const storageRef = storage.ref();
// const imagesRef = storageRef.child('images');
// //const cloudStore = firebase.firestore();
// //messaging
// const messaging = admin.messaging();
export default FB;