import React, { useEffect, useState } from 'react';
import styles from './ChatBox.module.css';
import { Link, useParams } from 'react-router-dom';
import { loadMessageAPI, sendMessageAPI, viewaUserProfileAPI } from '../services/appServices';
import { useSocket } from '../contexts/SocketContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';



function ChatBox() {

  const { id:peerId } = useParams()
  const { user } = useAuth();
  const { socket } = useSocket();  

  const [text, setText] = useState('');
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);

  // const [showVideo, setShowVideo] = useState(false)


  useEffect(()=>{
    
    const loadChat = async () => {
      try {
        const [msgRes, userRes] = await Promise.all([
          loadMessageAPI(peerId),
          viewaUserProfileAPI(peerId)
        ]);
        setMessages(msgRes.data);
        setUserData(userRes.data)
      } catch (error) {
         console.error('Load chat error:', error);
      }
    }

    loadChat()

  },[peerId])


  // REAT-TIME INCOMING MESSAGES
  useEffect(()=>{
    if(!socket)return;
    const handleIncoming = msg => {
      // only add if this convo
      if( (msg.sender === peerId && msg.receiver === user._id) || (msg.sender === user._id && msg.receiver === peerId) ) {
        setMessages(prev => [...prev, msg])
      }
      
    };

    socket.on('receiveMessage', handleIncoming);
    return () => socket.off('receiveMessage', handleIncoming);

  },[socket,peerId,user._id]);


  // send a new message (REST + Socket emit)
  const onSubmit = async (e) => {
    e.preventDefault();

    if(!text.trim() || !socket) return;

    try {
      // save to db
      const result = await sendMessageAPI(peerId, { text });
      const saved = result?.data;

      // emit over socket
      socket.emit('sendMessage',{
        toId: peerId,
        text,
        _id: saved._id
      })

      setMessages(prev => [...prev, saved]);
      setText('')
      
    } catch (error) {
      console.error('Send message error:', error);
      toast.error('Unable to send message');
    }
  }

  

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


          <button className='btn text-dark' onClick={()=> toast.warning("Feature Coming soon")}><i class="fa-solid fa-xl fa-video fa-flip-horizontal"></i></button>


        </div>

      </div>


      {/* MESSAGE BOX--------------------------------------------------- */}
      <div className={styles.chatBody}>
        {messages?.map(msg => {
          const isMine = msg.sender === user._id;
          return(
            <div className={`${styles.message} ${isMine? styles.own : ''}`} key={msg._id}>
                {msg?.text}
           </div>
          )
        })}
      </div>




      <div>
        <form className={styles.chatInput} onSubmit={onSubmit}>

          {/* <div className={styles.customFileUpload}>
            <label htmlFor="fileInput" className={styles.fileLabel}>
              <i class="fa-solid fa-image"></i>
            </label>
            <input id="fileInput" type="file" accept="image/*" className={styles.fileInput} onChange={(e) => console.log(e.target.files[0])} />
          </div> */}

          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message..." className={styles.messageInput} />

          <button type="submit" disabled={!text.trim()} className='btn btn-primary px-4'>Send</button>
        </form>
      </div>



      {/* video comp----------------------- */}

      {/* {showVideo && (
        <VideoCall peerId={peerId} onClose={()=>setShowVideo(false)}/>
      )}
 */}


    </div>
  );
}

export default ChatBox;
