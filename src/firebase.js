import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCevfjxYh5AOuPpzdQmiqTJOyoDJHZRxRQ",
  authDomain: "salarymanagementapp-bf7be.firebaseapp.com",
  projectId: "salarymanagementapp-bf7be",
  storageBucket: "salarymanagementapp-bf7be.appspot.com",
  messagingSenderId: "278630086267",
  appId: "1:278630086267:web:937597dc30e7b764dbd4de"
};

  export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);