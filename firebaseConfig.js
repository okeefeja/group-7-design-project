// import firebase from 'firebase/app';
// import 'firebase/auth';
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

export const firebaseConfig = {
    apiKey: "AIzaSyC9TBgvHGx5np7UGePPYf9vHY0XjzM2IVg",
    authDomain: "fitness-app-fd0eb.firebaseapp.com",
    projectId: "fitness-app-fd0eb",
    storageBucket: "fitness-app-fd0eb.appspot.com",
    messagingSenderId: "951611446079",
    appId: "1:951611446079:web:32bf5a3bc306a35910398a"
  };

// // Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);

// export default firebase;