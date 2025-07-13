import React, { useEffect, useState } from 'react';
import styles from './ChatBox.module.css';
import { Link, useParams } from 'react-router-dom';
import { loadMessageAPI, sendMessageAPI, viewaUserProfileAPI } from '../services/appServices';

function ChatBox() {
  const { id } = useParams()

  const [message, setMessage] = useState("")
  const [userData, setUserData] = useState()
  const [loadedMsgData, setLoadedMsgData] = useState([])
  const myId = sessionStorage.getItem('userid')


  const messageData = new FormData();
  messageData.append('text', message)


  const sendmessage = async (e) => {
    e.preventDefault()
    try {
      await sendMessageAPI(id, messageData);
      loadMessages()
      setMessage("")

    } catch (error) {
      console.log(error);
      alert("Server Error! Unable to send message")

    }
  }


  // {_id: '6872023d0f218dfcb0484278', sender: '6870c2cfe4611f3e5037b69b', receiver: '6870cfecebc2ad59a61243aa', text: 'Hii sethu... its arun here.', seen: false, …}


  const loadMessages = async () => {
    try {
      const result = await loadMessageAPI(id)      
      setLoadedMsgData(result?.data)

    } catch (error) {
      console.log(error);
    }
  }



  const getUserProfile = async () => {

    try {
      const result = await viewaUserProfileAPI(id);
      setUserData(result?.data)

    } catch (error) {
      console.log(error);

    }
  }


  useEffect(() => {
    getUserProfile()
    loadMessages()
  }, [id])


  return (
    <div className={styles.chatBox}>

      <div className={styles.chatHeader}>

        <div className='d-flex align-items-center justify-content-between'>
          <div className='d-flex align-items-center'>
            <Link to={'/viewuserprofile/1234'}>
              <img
                src={userData?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                alt=""
                className="rounded-circle shadow"
                style={{ width: '46px', height: '46px', objectFit: 'cover' }}
              />
            </Link>
            <div className="d-flex flex-column ms-2">
              <h4 className="mb-1" style={{ fontSize: '1rem' }}>{userData?.username}</h4>
              {/* <p className="mb-0 text-muted small">offline</p> */}
            </div>
          </div>

          <button className='btn text-dark'><i class="fa-solid fa-xl fa-video fa-flip-horizontal"></i></button>

        </div>

      </div>


      {/* MESSAGE BOX--------------------------------------------------- */}
      <div className={styles.chatBody}>
        {loadedMsgData?.map((msg, index) => {
          if (msg?.sender === myId) {
            // My message (sent)
            return (
              <div className={`${styles.message} ${styles.own}`} key={index}>
                {msg?.text}
              </div>
            );
          } else if (msg?.receiver === myId) {
            //  message (received)
            return (
              <div className={styles.message} key={index}>
                {msg?.text}
              </div>
            );
          }

          return null; // If neither, don't render
        })}
      </div>




      <div>
        <form className={styles.chatInput} onSubmit={sendmessage}>

          <div className={styles.customFileUpload}>
            <label htmlFor="fileInput" className={styles.fileLabel}>
              <i class="fa-solid fa-image"></i>
            </label>
            <input id="fileInput" type="file" accept="image/*" className={styles.fileInput} onChange={(e) => console.log(e.target.files[0])} />
          </div>

          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." className={styles.messageInput} />

          <button type="submit" disabled={!message} className='btn btn-primary px-4'>Send</button>
        </form>
      </div>



    </div>
  );
}

export default ChatBox;
