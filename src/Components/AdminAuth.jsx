import {db,auth} from "./../firebase";
import {GoogleAuthProvider,signInWithPopup,signInWithEmailAndPassword,createUserWithEmailAndPassword,sendPasswordResetEmail,signOut} from "firebase/auth";
import {query, getDocs,collection,where,addDoc} from "firebase/firestore";
import Cookies from 'js-cookie';

const googleProvider = new GoogleAuthProvider();

const authorizeUser= async(uid)=>{
    try{
      const q=query(collection(db,'users'),where('uid','==',uid))
      const docSnap = await getDocs(q);
      const usersDocID=docSnap.docs[0].id;
      const usersEmailID=docSnap.docs[0].data().email;
      const adQ=query(collection(db,'admin'),where('usersDocID','==',usersDocID))
      const adSnap = await getDocs(adQ);
      const adminID=adSnap.docs[0].id;
      const adminName=adSnap.docs[0].data().name;
      const admin={adminID:adminID,adminName:adminName,usersDocID:usersDocID,userEmailID:usersEmailID}
      Cookies.set('adminData',JSON.stringify(admin))
      window.location='/AdminProfile'
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
const registerWithEmailAndPassword = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const docID=await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      email,
    });
    return docID
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (error) {
    alert(error.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  signInWithGoogle,
  logInWithEmailAndPassword,
  sendPasswordReset,
  registerWithEmailAndPassword,
  logout,
  authorizeUser
};

