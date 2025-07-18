import React from 'react'
import styles from './Dashboard.module.css';
import ChatList from '../components/ChatList';


function Dashboard() {
  return (
    <div className={`${styles.dashboardWrapper}`}>

      <div className={styles.chatListSection}>
        <ChatList />
      </div>

      <div className={`${styles.chatBoxSection} shadow-sm d-flex align-items-center justify-content-center`}>

        <h3>Click on a Profile to chat</h3>
      </div>

    </div>
  );
}

export default Dashboard