import {db,auth} from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();
const authorizeUser= async(uid)=>{
  try{
    const q=query(collection(db,'users'),where('uid','==',uid))
    const docSnap = await getDocs(q);
    let usersDocID=docSnap.docs[0].id;
    let usersEmailID=docSnap.docs[0].data().email;
    const adQ=query(collection(db,'accountant'),where('usersDocID','==',usersDocID))
    const adSnap = await getDocs(adQ);
    const accID=adSnap.docs[0].id;
    console.log(accID);
    const accountant={accountantID:accID,usersDocID:usersDocID,userEmailID:usersEmailID}
    localStorage.setItem('accountantData',JSON.stringify(accountant))
    window.location='/AccountantProfile'
  }
  catch(error){
    console.log(error)
    logout();
    window.location='/'
  }
}
const signInWithGoogle = async () => {
  var flag=false;
  var res;
  try {
      await signInWithPopup(auth, googleProvider).then((credentials)=>{
      res=credentials;
      flag=true
    });
  } catch (error) {
    alert('Check Credentials'+error.message);
  }
  if(flag){
    authorizeUser(res.user.uid);
  }
  else{
    console.log('Error');
  }
};


const logInWithEmailAndPassword = async (email, password) => {
  var flag=false;
  var res;
  try {
    await signInWithEmailAndPassword(auth, email, password).then((credentials)=>{
      res=credentials;
      flag=true
    });
  } catch (error) {
    alert('Check Credentials'+error.message);
  }
  if(flag){
    authorizeUser(res.user.uid);
  }
  else{
    console.log('Error');
  }
  
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  signInWithGoogle,
  logInWithEmailAndPassword,
  sendPasswordReset,
  logout
};

