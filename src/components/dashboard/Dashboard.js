import React, { useEffect, useState, useContext } from 'react';

import Chat from '../chat/Chat';
import Sidebar from '../sidebar/Sidebar';

import AppContext from '../App.context';

import styles from './Dashboard.module.scss';
import { deleteMsg, getChatsForUser } from '../../api';
import Header from '../header/Header';
import { useIsSmallScreen } from '../utils';

const Dashboard = () => {
  const appContext = useContext(AppContext);
  const currentUser = appContext.currentUser;
  const [chats, setChats] = useState({});
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const updateState = (chats) => {
      // If no chat is selected, select the first chat
      setChats(chats);
      setSelectedChatId(selectedChatId || Object.keys(chats)[0]);
    };

    getChatsForUser(currentUser.uid, updateState);
  }, []);

  const deleteMessageFromChat = (msgId) => {
    // TODO: Ugly full state overwrite
    deleteMsg(msgId);
    const newChats = { ...chats };
    newChats[selectedChatId].messages = newChats[
      selectedChatId
    ].messages.filter((m) => m.id !== msgId);
    setChats(newChats);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId);
    toggleSidebar();
  };

  const content = (
    <div className={styles.Container}>
      <Header
        selectedChat={chats[selectedChatId]}
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      <div className={styles.Content}>
        {isSidebarOpen && (
          <Sidebar
            onSelectChat={handleSelectChat}
            chats={chats}
            toggle={toggleSidebar}
          />
        )}
        {!(useIsSmallScreen() && isSidebarOpen) && (
          <Chat
            onDelete={deleteMessageFromChat}
            chatId={chats[selectedChatId].id}
            messages={chats[selectedChatId].messages}
            chatName={chats[selectedChatId].name}
            toggleSidebar={toggleSidebar}
          />
        )}
      </div>
    </div>
  );

  const loader = 'Loading';

  return selectedChatId ? content : loader;
};

export default Dashboard;
