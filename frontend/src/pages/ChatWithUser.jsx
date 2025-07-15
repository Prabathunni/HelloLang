import React from 'react'
import styles from './Dashboard.module.css';
import ChatList from '../components/ChatList';
import ChatBox from '../components/ChatBox';

function ChatWithUser() {


  



  return (
    <div className={`${styles.dashboardWrapper}`}>

      <div className={styles.chatListSection}>
        <ChatList />
      </div>

      <div className={`${styles.chatBoxSection} shadow-sm`}>
        <ChatBox />
      </div>

    </div>
  )
}

export default ChatWithUser