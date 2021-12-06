import * as firebase from "firebase/app";
import 'firebase/firestore';

import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

 firebase.initializeApp({
  apiKey: "AIzaSyCGKGbtgZ_QJQpKKR3vz8uZkQTBSdsKB0A",
  authDomain: "real-estate-app-589a1.firebaseapp.com",
  databaseURL: "https://real-estate-app-589a1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "real-estate-app-589a1",
  storageBucket: "real-estate-app-589a1.appspot.com",
  messagingSenderId: "1035285696955",
  appId: "1:1035285696955:web:2be5eff54f7711a97c349e"
});


// Initialize Firebase
const db = getFirestore()

export {db}