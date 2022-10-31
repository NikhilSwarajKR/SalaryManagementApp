import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from '@firebase/firestore'
import {getStorage} from "firebase/storage";
<<<<<<< HEAD
=======
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
>>>>>>> nikhil

const firebaseConfig = {
  apiKey: "AIzaSyCevfjxYh5AOuPpzdQmiqTJOyoDJHZRxRQ",
  authDomain: "salarymanagementapp-bf7be.firebaseapp.com",
  projectId: "salarymanagementapp-bf7be",
  storageBucket: "salarymanagementapp-bf7be.appspot.com",
  messagingSenderId: "278630086267",
  appId: "1:278630086267:web:937597dc30e7b764dbd4de"
};

const app = initializeApp(firebaseConfig);
<<<<<<< HEAD
const auth = getAuth(app);
const db =getFirestore(app);
const storage = getStorage(app);

export {db,storage};
=======
export const auth = getAuth(app);
export const db =getFirestore(app);
export const storage = getStorage(app);
export const BUCKET_URL = "gs://salarymanagementapp-bf7be.appspot.com";
>>>>>>> nikhil
