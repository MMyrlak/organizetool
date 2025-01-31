// Import the functions you need from the SDKs you need
import { initializeApp } from '@firebase/app'
import { getFirestore } from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8kGnhutAxOq-UNREeT7L983HwVeLdNgU",
  authDomain: "organizetool.firebaseapp.com",
  databaseURL: "https://organizetool-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "organizetool",
  storageBucket: "organizetool.appspot.com",
  messagingSenderId: "350472743542",
  appId: "1:350472743542:web:72425d27d27c25f66f4d57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, firebaseConfig, app };