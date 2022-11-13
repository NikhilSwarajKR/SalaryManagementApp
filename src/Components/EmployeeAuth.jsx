import {db,auth} from "./../firebase";
import {GoogleAuthProvider,signInWithPopup,signInWithEmailAndPassword,sendPasswordResetEmail,signOut} from "firebase/auth";
import {query, getDocs,collection,where,addDoc} from "firebase/firestore";
import Cookies from 'js-cookie';

const googleProvider = new GoogleAuthProvider();

const authorizeUser= async(uid)=>{
    try{
      const q=query(collection(db,'users'),where('uid','==',uid))
      const docSnap = await getDocs(q);
      const usersDocID=docSnap.docs[0].id;
      const usersEmailID=docSnap.docs[0].data().email;
      const empQ=query(collection(db,'employees'),where('usersDocID','==',usersDocID))
      const empSnap = await getDocs(empQ);
      const empID=empSnap.docs[0].id;
      const employee={employeeID:empID,usersDocID:usersDocID,userEmailID:usersEmailID}
      Cookies.set('employeeData',JSON.stringify(employee))
      window.location='/EmployeeProfile'
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
  logout,
  authorizeUser
};

