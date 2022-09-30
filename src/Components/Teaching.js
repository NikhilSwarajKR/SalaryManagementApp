import React,{useState, useEffect, Component} from 'react'
import db from './../firebase';
import {collection, query, getDocs} from 'firebase/firestore';
import './Teaching.css';
import ReactDOM  from 'react-dom';



export default function Teaching() {
 let data=[]
  const getUserdetails = async () => {
    
    const Query = query(collection(db, "teaching_department"));
    const querySnapshot = await getDocs(Query);
    querySnapshot.map((doc) => {
      data.push(doc.data());
      console.log(doc.id, " => ", doc.data());
    });
    console.log(Set(data));
  }
  useEffect(() => {
    getUserdetails();
  }, [])

  
  return (
    <div>Teaching</div>
  )
}
