import List from './component/list/List'
import Chat from './component/chat/Chat'
import Detail from './component/detail/Detail'
import Login from './component/login/Login'
import './App.css';
import Notification from './component/Notification/Notification';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './component/lib/firebase';
import { useUserStore } from './component/lib/userStore';
import { useChatStore } from './component/lib/chatStore';







function App() {
 

  const {currentUser, isLoading,fetchUserInfo} = useUserStore();
  const {chatId} = useChatStore();
  useEffect(()=>{
  const unSub = onAuthStateChanged(auth,(user)=>{
    fetchUserInfo(user ?.uid);
  });
return () =>{
  unSub();
}

},[fetchUserInfo]);
console.log(currentUser);
  return (
    <div className="container">
      {
        currentUser ? (
        <>
        <List/>
       {chatId && <Chat/>}
       {chatId &&  <Detail/>}
        </>
        ):(<Login/>)
      }
      <Notification/>
    </div>
  );
}

export default App;
