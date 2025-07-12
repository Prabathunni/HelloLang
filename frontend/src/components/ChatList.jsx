import React from 'react';
import styles from './ChatList.module.css';
import { Link } from 'react-router-dom'


function ChatList() {
  return (
<div className="d-flex flex-column justify-content-between bg-light">

  <div className={styles.chatList}>
    <h4 className="text-primary text-center mb-3">My Chats</h4>
    <hr />

    <div className={`${styles.userItem} d-flex align-items-center`}>
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        alt=""
        className="rounded-circle shadow"
        style={{ width: '46px', height: '46px', objectFit: 'cover' }}
      />
      <div className="d-flex flex-column ms-2">
        <h4 className="mb-1" style={{ fontSize: '1rem' }}>user name 1</h4>
        <p className="mb-0 text-muted small">offline</p>
      </div>
    </div>

    <div className={`${styles.userItem} d-flex align-items-center`}>
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        alt=""
        className="rounded-circle shadow"
        style={{ width: '46px', height: '46px', objectFit: 'cover' }}
      />
      <div className="d-flex flex-column ms-2">
        <h4 className="mb-1" style={{ fontSize: '1rem' }}>user name 1</h4>
        <p className="mb-0 text-muted small">offline</p>
      </div>
    </div>

    <div className={`${styles.userItem} d-flex align-items-center`}>
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        alt=""
        className="rounded-circle shadow"
        style={{ width: '46px', height: '46px', objectFit: 'cover' }}
      />
      <div className="d-flex flex-column ms-2">
        <h4 className="mb-1" style={{ fontSize: '1rem' }}>user name 1</h4>
        <p className="mb-0 text-muted small">offline</p>
      </div>
    </div>

  </div>

</div>
  );
}

export default ChatList;
