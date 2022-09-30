import React,{useState, useEffect} from 'react'
import db from '../firebase';
import {collection, query, getDocs} from 'firebase/firestore';
import './Teaching.css';
import ReactDOM  from 'react-dom';

export default function Non_Teaching() {
  const [data, getData] = useState([]);
  const fetchTeachers=async()=>{
    const response=collection(db,'nonteaching_department');
    getDocs(response).then((snap) => {
      snap.forEach((doc) => {
        getData([doc.data()]);
      });
    })
  }
  useEffect(() => {
    fetchTeachers();
  }, [])
  return (
    <div className='rendering'>  {
      data.map(item=>{
        return(
          <div className="blog-container" key={item.name}>
            <h4>{item.name}</h4>
            <p>{item.Qualification}</p>
          </div>
        )
      })
    }
    </div>)
}

