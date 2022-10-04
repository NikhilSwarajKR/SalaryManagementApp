// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCevfjxYh5AOuPpzdQmiqTJOyoDJHZRxRQ",
  authDomain: "salarymanagementapp-bf7be.firebaseapp.com",
  projectId: "salarymanagementapp-bf7be",
  storageBucket: "salarymanagementapp-bf7be.appspot.com",
  messagingSenderId: "278630086267",
  appId: "1:278630086267:web:937597dc30e7b764dbd4de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db =getFirestore(app);

export default db;
// export const storage = app.storage();