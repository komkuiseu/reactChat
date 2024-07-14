import React, { useEffect, useState } from 'react'
import '../chatList/chatList.css'
import Adduser from "../../adduser/Adduser"
import { useUserStore } from '../../lib/userStore'
import { db } from '../../lib/firebase';
import { doc,getDoc,onSnapshot, updateDoc } from 'firebase/firestore';
import { useChatStore } from '../../lib/chatStore';

function ChatList() {

    //changer l icone de recherche avec useState 
    const [chats,setchats]=useState([]);
    const [addMode,setAddMode]=useState(false)

    const [input,setinput]=useState("")


    //ecouteur de ecriture 
    const {currentUser}=useUserStore();
    const {chatId,changeChat}=useChatStore();
    


   useEffect(()=>{
    const unSub = onSnapshot(
        doc(db, "userchats", currentUser.id), async (res) => {
     const items = res.data().chats;


    const promises =items.map(async(item)=>{
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);

        const user =userDocSnap.data();

        return {...item,user};
   });
      
    const chatData = await Promise.all(promises)

  setchats(chatData.sort((a,b)=>b.updatedAt - a.updatedAt));
    });

    return () =>{
        unSub();
    };
 },[currentUser.id]);

 
const handleSelect = async (chat)=>{

const userChats = chats.map((item)=>{
    const {user,...rest}=item;
    return rest;
});
const chatIndex = userChats.findIndex(item=>item.chatId===chat.chatId)
userChats[chatIndex].isSeen =true;

const userChatRef = doc(db,"userchats",currentUser.id);
try {
    await updateDoc(userChatRef,{
        chats:userChats,
    });
    changeChat(chat.chatId,chat.user)
} catch (error) {
    console.log(error);
}


}


const filteredChats = chats.filter((c)=>c.user.username.toLowerCase().includes(input.toLowerCase()));


  return (
    <div className='chatList'>
        <div className="search">
            <div className="searchBar">
                <img src="./search.png" alt="" />
                <input type="text" name="" placeholder='search'onChange={(e)=>setinput(e.target.value)}/>
            </div>
            <img src={addMode ?"./minus.png" :"./plus.png"} alt="" className='add'  
            onClick={()=> setAddMode((prev)=> !prev)}/>
        </div>

        {filteredChats.map((chat) =>(

        <div className="item" 
        key={chat.chatId} 
         onClick={()=>handleSelect(chat)}
         style={{backgroundColor:chat?.isSeen ? "transparent" :"#5183fe",}}
         >
            <img src={chat.user.blocked.includes(currentUser.id) ? "./avatar.png" : chat.user.avatar||"./avatar.png"} alt="" />
            <div className="texts">
                <span>{chat.user.blocked.includes(currentUser.id) ? "user" : chat.user.username}</span>
                <p>{chat.lastMessage}</p>
            </div>
        </div>
        ))}
        
       
      {addMode  && <Adduser />}
    </div>
  )
}

export default ChatList