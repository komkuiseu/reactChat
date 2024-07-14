import React, { useState } from 'react'
import '../adduser/Adduser.css'

import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useUserStore } from '../lib/userStore';

function Adduser() {
const {currentUser} =useUserStore()
  const [user,setuser]=useState(null)

  const handleSearch =async (e)=>{
    e.preventDefault()
    const formData =new FormData(e.target);
    const username = formData.get("username")

    try {
      
// Create a reference to the cities collection

const userRef = collection(db, "users");

// Create a query against the collection.
const q = query(userRef, where("username", "==", username));

    const querySnapshot = await getDocs(q)
 if(!querySnapshot.empty){
 setuser(querySnapshot.docs[0].data());
 }

    } catch (error) {
      console.log(error);
    
    }
  };

//add un utilisateur 
const handleAdd = async ()=>{
 const chatRef = collection(db,"chats")
 const userChatsRef = collection(db,"userchats")

  try {
    const newChatRef= doc(chatRef)

   await  setDoc(newChatRef,{
    createdAt:serverTimestamp(),
    massages:[]
   });
   
await updateDoc(doc(userChatsRef,user.id),{
  chats:arrayUnion({
    chatId: newChatRef.id,
    lastMessage:"",
  receiverId:currentUser.id,
  updatedAt: Date.now(),
  })
})

await updateDoc(doc(userChatsRef,currentUser.id),{
  chats:arrayUnion({
    chatId: newChatRef.id,
    lastMessage:"",
  receiverId:user.id,
  updatedAt: Date.now(),
  })
})


console.log(newChatRef.id);
  } catch (error) {
    console.log(error);
  }
}




  return (
    <div className='adduser'>
        <form  onSubmit={handleSearch}>
            <input type="text" name="username" id=""  placeholder='username'/>
            <button>Search</button>

        </form>
       { user &&  <div className="user">
            <div className="detail">
            <img src={user.avatar || "./avatar.png" }alt="" />
                <span>{user.username}</span>
            </div>
                <button onClick={handleAdd}>add user</button>
        </div>}
    </div>
  )
}

export default Adduser