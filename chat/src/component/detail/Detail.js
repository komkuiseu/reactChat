import React from 'react'
import '../detail/Detail.css'
import { auth, db } from '../lib/firebase';
import { useChatStore } from '../lib/chatStore';
import { useUserStore } from '../lib/userStore';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

function Detail() {

const {chatId,user,isCurrentUserBlocked,isReceiverBlocked,changeBlock}=useChatStore()
const {currentUser}=useUserStore();

  const handleBlock = async()=>{
    if(!user) return ;
const userDocRef = doc(db,"users",currentUser.id)

    try {
      await updateDoc(userDocRef,{
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      })
      changeBlock()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='detail'>
      <div className="user">
      <img src={user?.avatar ||"./avatar.png"} alt="" />
      <h2>{user?.username}</h2>
      <p>je suis deja debout au petit matin</p>
      </div>
      <div className="info">
        
        <div className="option">
          <div className="title">
            <span>chat settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>privacy % help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>shared photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">

            <div className="photoItem">
                <div className="photoDetail">
                  <img src="https://i-sam.unimedias.fr/2018/05/18/profil-amoureux.jpg?auto=format,compress&cs=tinysrgb&w=1200" alt="" />
                  <span>photo_2024_2.png</span>
                </div>
                 <img src="./download.png" className="icons" alt="" />
              </div>
            <div className="photoItem">
                <div className="photoDetail">
                  <img src="https://i-sam.unimedias.fr/2018/05/18/profil-amoureux.jpg?auto=format,compress&cs=tinysrgb&w=1200" alt="" />
                  <span>photo_2024_2.png</span>
                </div>
                 <img src="./download.png"  className="icons"alt="" />
              </div>
         
            <div className="photoItem">
                <div className="photoDetail">
                  <img src="https://i-sam.unimedias.fr/2018/05/18/profil-amoureux.jpg?auto=format,compress&cs=tinysrgb&w=1200" alt="" />
                  <span>photo_2024_2.png</span>
                </div>
                 <img src="./download.png"  className="icons"alt="" />
              </div>
            <div className="photoItem">
                <div className="photoDetail">
                  <img src="https://i-sam.unimedias.fr/2018/05/18/profil-amoureux.jpg?auto=format,compress&cs=tinysrgb&w=1200" alt="" />
                  <span>photo_2024_2.png</span>
                </div>
                 <img src="./download.png"  className="icons"alt="" />
              </div>
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button onClick={handleBlock} className='h-btnn'>{
       isCurrentUserBlocked ? "you are blocked !" : isReceiverBlocked ? "user blocked" : "blocked user"
      }</button>
        <button className='logout' onClick={()=>auth.signOut()}>logout</button>
      </div>
    </div>
  );
};

export default Detail