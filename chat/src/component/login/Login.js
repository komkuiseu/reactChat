import React, { useState } from 'react'
import "../login/Login.css"
import { toast } from 'react-toastify'
import {createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth"
import {auth, db} from "../lib/firebase"
import { doc, setDoc } from "firebase/firestore"; 

import upload from '../lib/upload'

function Login() {
const [avatar ,setavatar]=useState({
    file:null,
    url:""

})

const [loading,setloading]=useState(false)


const handleAvatar = (e)=>{
    if(e.target.files[0]){

        setavatar({
            file:e.target.files[0],
            url:URL.createObjectURL(e.target.files[0])
        })
    }
}

const handleRegister = async (e) =>{
    e.preventDefault();
    setloading(true)

   const formData = new FormData(e.target);
   const {username , email , password} = Object.fromEntries(formData);
  
   try {
     const res = await createUserWithEmailAndPassword(auth,email,password)

     const imgUrl =await upload(avatar.file)

   // Add a new document in collection "cities"
await setDoc(doc(db, "users", res.user.uid), {
    username,
    email,
    avatar:imgUrl,
    id:res.user.uid,
    blocked:[]
  });
     
  await setDoc(doc(db, "userchats", res.user.uid), {
    chats:[],
    });
     
  toast.success("compte creé")
   } catch (error) {
    console.log(error);
    toast.error(error.message)
   }finally{
    setloading(false)
   }
};


const handleLogin = async (e)=>{
    e.preventDefault()

    setloading(true)
    const formData = new FormData(e.target);
   const {email , password} = Object.fromEntries(formData);

try {
    
await signInWithEmailAndPassword(auth,email,password)

} catch (error) {
    console.log(error);
    toast.error(error.message)
}finally{
     setloading(false)
}
    
};



  return (
    <div className='Login'>
       <div className="item">
        <h2>welcome back ,</h2>

        <form action="" onSubmit={handleLogin}>
            <input type="email" name="email" id="" placeholder='email' />
            <input type="password" name="password" id="" placeholder='password' />
            <button className='b
            h-btnn' disabled={loading}> {loading ? "loading" :"sign In" }</button>
        </form>
       </div>

       <div className="separator"></div>

       <div className="item">
            <h2>
                create an account ..
            </h2>
            <form action=""  onSubmit={handleRegister}  >
                <img src="" alt="" />
                   <label htmlFor="file">
                     <img src={avatar.url || "./avatar.png"} alt="" />
                     Upload an image
                    </label>
                    <input type="file" name="" id="file" style={{display:"none"}}  onChange={handleAvatar} />
                    <input type="text" name="username" id="" placeholder='username' />
                    <input type="email" name="email" id="" placeholder='email' />
                    <input type="password" name="password" id="" placeholder='password' />
                    <button className='h-btnn' disabled={loading}> {loading ? "loading" :"sign Up" }</button>
                </form>
       </div>

    </div>
  )
}

export default Login