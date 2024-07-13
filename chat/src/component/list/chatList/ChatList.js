import React, { useState } from 'react'
import '../chatList/chatList.css'
import Adduser from "../../adduser/Adduser"

function ChatList() {
    //changer l icone de recherche avec useState 
    const [addMode,setAddMode]=useState(false)
  return (
    <div className='chatList'>
        <div className="search">
            <div className="searchBar">
                <img src="./search.png" alt="" />
                <input type="text" name="" placeholder='search' id="" />
            </div>
            <img src={addMode ?"./minus.png" :"./plus.png"} alt="" className='add'  
            onClick={()=> setAddMode((prev)=> !prev)}/>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>kom elie</span>
                <p>love</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>kom elie</span>
                <p>love</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>kom elie</span>
                <p>love</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>kom elie</span>
                <p>love</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>kom elie</span>
                <p>love</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>kom elie</span>
                <p>love</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>kom elie</span>
                <p>love</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>kom elie</span>
                <p>love</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>kom elie</span>
                <p>love</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>kom elie</span>
                <p>love</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>kom elie</span>
                <p>love</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>kom elie</span>
                <p>love</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>kom elie</span>
                <p>love</p>
            </div>
        </div>
       
      {addMode  && <Adduser />}
    </div>
  )
}

export default ChatList