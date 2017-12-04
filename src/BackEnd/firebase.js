import * as firebase from 'firebase';
//initializing firebase
//you firebase config here
const FB = firebase.initializeApp(config);
// const storage = firebase.storage();
// const storageRef = storage.ref();
// const imagesRef = storageRef.child('images');
// //const cloudStore = firebase.firestore();
// //messaging
// const messaging = admin.messaging();
export default FB;
