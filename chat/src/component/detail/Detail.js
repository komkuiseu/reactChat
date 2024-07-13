import React from 'react'
import '../detail/Detail.css'

function Detail() {
  return (
    <div className='detail'>
      <div className="user">
      <img src="./avatar.png" alt="" />
      <h2>kom elie</h2>
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
        <button className='h-btnn'>block user</button>
        <button className='logout'>logout</button>
      </div>
    </div>
  );
};

export default Detail