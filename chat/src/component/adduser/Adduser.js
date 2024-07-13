import React from 'react'
import '../adduser/Adduser.css'

function adduser() {
  return (
    <div className='adduser'>
        <form action="">
            <input type="text" name="username" id=""  placeholder='username'/>
            <button>Search</button>

        </form>
        <div className="user">
            <div className="detail">
            <img src="./avatar.png" alt="" />
                <span>kom eili</span>
            </div>
                <button>add user</button>
        </div>
    </div>
  )
}

export default adduser