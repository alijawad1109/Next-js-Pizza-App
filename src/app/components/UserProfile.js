'use client'
// import { useEffect, useState } from 'react'

// const UserProfile = () => {
//     const [data,setData]=useState(false)
//     const [loading,setLoading]=useState(true)
//     useEffect(()=>{
//       setLoading(true);
//       fetch('/api/profile').then(response =>{
//         response.json().then(data =>{
//           setData(data)
//           setLoading(false)
//         })
//       })
//     },[])
//     if(loading){
//       return "Loading..."
//     }
//     if(!data.admin){
//       return "Not be authorized to visit this page"
//     }
   
//   return {loading,data}
// }

// export default UserProfile
import {useEffect, useState} from "react";

export function UserProfile() {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch('/api/profile').then(response => {
      response.json().then(data => {
        setData(data);
        setLoading(false);
      });
    })
  }, []);

  return {loading, data};
}