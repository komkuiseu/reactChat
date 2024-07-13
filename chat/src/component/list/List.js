import React from 'react'
import '../list/List.css'
import Userinfo from './userinfo/Userinfo'
import ChatList from '../list/chatList/ChatList'


function List() {
  return (
    <div className='list'>
        <Userinfo/>
        <ChatList/>
    </div>
  )
}

export default List