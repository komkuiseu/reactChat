import List from './component/list/List'
import Chat from './component/chat/Chat'
import Detail from './component/detail/Detail'
import Login from './component/login/Login'
import './App.css';
import Notification from './component/Notification/Notification';
import { useEffect } from 'react';
import { auth } from './component/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useStore } from 'zustand';




function App() {
const  {currentUser ,isLoading ,fetchUserInfo} = useStore()

  useEffect(()=>{
  const unSub = onAuthStateChanged(auth,(user)=>{
    console.log(user.uid);
  })
  },[])
  return (
    <div className="container">
      {
        user ? (
        <>
        <List/>
        <Chat/>
        <Detail/>
        </>
        ):(<Login/>)
      }
      <Notification/>
    </div>
  );
}

export default App;
