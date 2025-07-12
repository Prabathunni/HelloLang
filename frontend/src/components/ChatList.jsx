import React, { useEffect, useState } from 'react';
import styles from './ChatList.module.css';
import { Link } from 'react-router-dom'
import { getAllFriendsAPI } from '../services/appServices';


function ChatList() {
  const [friendsData,setFriendsData]=useState([])

  const getAllFriends = async () => {
    try {
      const result = await getAllFriendsAPI()
      setFriendsData(result?.data)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  console.log(friendsData);
  

  useEffect(()=>{
    getAllFriends()
  },[])

  return (
<div className="d-flex flex-column justify-content-between bg-light">

  <div className={styles.chatList}>
    <h4 className="text-primary text-center mb-3">My Friends</h4>
    <hr />
{ friendsData.length>0?
     friendsData.map((item)=>(
    <Link to={`/chat/${item?._id}`} className={`${styles.userItem} d-flex align-items-center text-decoration-none text-dark`} key={item?._id}>
      <img
        src={item?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
        alt=""
        className="rounded-circle shadow"
        style={{ width: '46px', height: '46px', objectFit: 'cover' }}
      />
      <div className="d-flex flex-column ms-2">
        <h4 className="mb-1" style={{ fontSize: '1rem' }}>{item?.username}</h4>
        {/* <p className="mb-0 text-muted small">offline</p> */}
      </div>
    </Link>
     )) 
    :
    <h4>No Friends yet</h4>
}

  </div>

</div>
  );
}

export default ChatList;
