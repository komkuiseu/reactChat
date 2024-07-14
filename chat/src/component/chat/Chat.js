import React, { useEffect, useRef, useState } from 'react'
import '../chat/Chat.css'
import EmojiPicker from 'emoji-picker-react'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useChatStore } from '../lib/chatStore';
import { useUserStore } from '../lib/userStore';
import upload from "../lib/upload"
//npm i emoji-picker-react
function Chat() {
const [open , setOpen]=useState(false);
const [text,setText]=useState("");
const [chat,setchat]=useState();
const {chatId,user,isCurrentUserBlocked,isReceiverBlocked,changeBlock}=useChatStore();
const {currentUser}=useUserStore();
const [img,setimg]=useState({

  file:null,
  url:"",
});

const endRef = useRef(null)

useEffect (()=>{
  endRef.current?.scrollIntoView({behavior:"smooth"});
},[]);


useEffect(()=>{
   const unsub=onSnapshot(doc(db,"chats",chatId),(res)=>{
setchat(res.data())
   });

   return ()=>{
    unsub();
   }
},[chatId]);


const handleEmoji = e =>{
 setText(prev => prev + e.emoji);
 setOpen(false)
}


const handleimg = (e)=>{
  if(e.target.files[0]){

    setimg({
          file:e.target.files[0],
          url:URL.createObjectURL(e.target.files[0])
      })
  }
}



//send messages dans le chat 
const handleSend=async()=>{
  if(!text==="")return;
  let imgUrl=null;

  try {

if(img.file){
  imgUrl = await upload(img.file);
}



    await updateDoc(doc(db,"chats",chatId),{
      messages:arrayUnion({
        senderId:currentUser.id,
        text,
        createdAt:new Date(),
        ...(imgUrl && {img: imgUrl}),
      }),
    });

    const userIDs =[currentUser.id,user.id]


    userIDs.forEach(async(id)=>{

      const userChatRef = doc(db,"userchats",id)
      const userChatsSnapshot = await getDoc(userChatRef)
      
      if(userChatsSnapshot.exists()){
        const userChatsData =userChatsSnapshot.data()
        
        const chatIndex = userChatsData.chats.findIndex((c)=>c.chatId===chatId);
        userChatsData.chats[chatIndex].lastMessage=text;
        userChatsData.chats[chatIndex].isSeen=id===currentUser.id ? true : false;
        userChatsData.chats[chatIndex].updatedAt=Date.now();
        
        
        await updateDoc(userChatRef,{
          chats:userChatsData.chats,
        });
      }
    })


  } catch (error) {
    console.log(error);
  }
setimg({
  file:null,
  url:"",
});
setText("");
};
  return (
    <div className='chat'>

      <div className="top">
        <div className="user">
          <img src={user?.avatar ||"/avatar.png"} alt="" />
          <div className="texts">
            <span>{user?.username}</span>
            <p>je t aime de tour mon coeur ne me laisse pas seule mon bebe. </p>
          </div>
        </div>

        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
          
        </div>
      </div>

      <div className="center">
        
       { chat?.messages?.map(message=>(

        <div className={message.senderId === currentUser?.id ? "message own" : "message" } key={message?.createAt}>

     <div className="texts">
           { message.img &&
            <img src={message.img} alt=''/>}
            <p>{message.text}</p>
               {/* <span>{message}</span> */}
          </div>
        </div>
        
      ))
}
  { img.url &&
   (<div className="message own">
    <div className="texts">
      <img src={img.url} alt="" />
    </div>
  </div>)}
       

       
        <div ref={endRef}></div>

      </div>

      <div className="bottom">
          <div className="icons">
            <label htmlFor="file">
             <img src="./img.png" alt="" />
            </label>
             <input type="file" name="" id="file" style={{display:"none"}} onChange={handleimg}/>
             <img src="./camera.png" alt="" />
             <img src="./mic.png" alt="" />
          </div>

        <input type="text"  name="" id=""
         placeholder={(isCurrentUserBlocked || isReceiverBlocked) ?"you cannot send a message ": 'send messager ...' }
         value={text}
          onChange={e=>setText(e.target.value)} 
          disabled={isCurrentUserBlocked || isReceiverBlocked}
          />
        
          <div className="emoji">
            <img src="./emoji.png" alt=""  onClick={()=> setOpen((prev)=>!prev)} />
            <div className="picker">

            <EmojiPicker open ={open} onEmojiClick={handleEmoji} />
            </div>
          </div>
          <button className="sendBTN" onClick={handleSend} disabled={isCurrentUserBlocked || isReceiverBlocked}>send</button>
      </div>
    </div>
  )
}

export default Chat