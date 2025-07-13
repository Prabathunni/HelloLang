import React from 'react';
import styles from './ChatBox.module.css';
import { Link } from 'react-router-dom';

function ChatBox() {
  return (
    <div className={styles.chatBox}>

      <div className={styles.chatHeader}>

        <div className='d-flex align-items-center justify-content-between'>
          <div className='d-flex align-items-center'>
            <Link to={'/viewuserprofile/1234'}>
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt=""
                className="rounded-circle shadow"
                style={{ width: '46px', height: '46px', objectFit: 'cover' }}
              />
            </Link>
            <div className="d-flex flex-column ms-2">
              <h4 className="mb-1" style={{ fontSize: '1rem' }}>user name 1</h4>
              <p className="mb-0 text-muted small">offline</p>
            </div>
          </div>

          <button className='btn text-light'><i class="fa-solid fa-xl fa-video fa-flip-horizontal"></i></button>

        </div>

      </div>

      <div className={styles.chatBody}>
        {/* reciever message */}
        <div className={styles.message}>Hey, how are you?</div>

        {/* sender message */}
        <div className={`${styles.message} ${styles.own}`}>I’m good, you?</div>

      </div>




      <div>
        <form className={styles.chatInput} onSubmit={(e) => e.preventDefault()}>

          <div className={styles.customFileUpload}>
            <label htmlFor="fileInput" className={styles.fileLabel}>
              <i class="fa-solid fa-image"></i>
            </label>
            <input id="fileInput" type="file" accept="image/*" className={styles.fileInput} onChange={(e) => console.log(e.target.files[0])} />
          </div>

          <input type="text" placeholder="Type a message..." className={styles.messageInput} />

          <button type="submit" className={styles.sendButton}>Send</button>
        </form>
      </div>



    </div>
  );
}

export default ChatBox;
