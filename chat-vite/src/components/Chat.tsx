import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext'; 
import axios from 'axios';
import styles from './Chat.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';


interface IMessage {
  id: string;
  content: string;
  senderName: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
}

interface MessageProps {
  message: IMessage;
  onUpvote: (messageId: string) => void;
  onDownvote: (messageId: string) => void;
}


const Message: React.FC<MessageProps> = ({ message, onUpvote, onDownvote }) => {
  return (
    <div className={styles.chatMessageContainer}>
      <div className={styles.chatUser}>{message.senderName}</div> 
      <div className={styles.chatContent}>{message.content}</div>
      <div className={styles.voteButtons}>
        <button onClick={() => onUpvote(message.id)}>
          <FontAwesomeIcon icon={faThumbsUp} /> {message.upvotes}
        </button>
        <button onClick={() => onDownvote(message.id)}>
          <FontAwesomeIcon icon={faThumbsDown} /> {message.downvotes}
        </button>
      </div>
    </div>
  );
};


const Chat = () => {
  const [messages, setMessages] = useState<IMessage[] | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const {username, setUsername} = useContext(UserContext);
  const navigate = useNavigate();

   // Redirect to login page
  const handleLogout = () => {
    setUsername(''); 
    navigate('/');
  }


  useEffect(() => {
    axios.get('http://localhost:8085/message/')
      .then(res => setMessages(res.data.data))
      .catch(err => console.error(err));
  }, []);

  const handleUpvote = (messageId: string) => {
    axios.post(`http://localhost:8085/message/upvote/${messageId}`)
      .then(res => {
        if (res.data.status === "success") {
          setMessages(messages?.map(msg => msg.id === messageId ? res.data.data : msg) || []);
        }
      })
      .catch(err => console.error(err));
  };

  const handleDownvote = (messageId: string) => {
    axios.post(`http://localhost:8085/message/downvote/${messageId}`)
      .then(res => {
        if (res.data.status === "success") {
          setMessages(messages?.map(msg => msg.id === messageId ? res.data.data : msg) || []);
        }
      })
      .catch(err => console.error(err));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios.post('http://localhost:8085/message/', {
      content: newMessage,
      senderName: username    
    })
      .then(res => {
        if (res.data.status === "success") {
          setMessages(oldMessages => [...oldMessages || [], res.data.data]);
          setNewMessage('');
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className={styles.chatContainer}>
      <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
      <div className={styles.chatMessagesList}>
        {messages ? messages.map(message => (
          <Message 
            key={message.id} 
            message={message} 
            onUpvote={handleUpvote} 
            onDownvote={handleDownvote} 
          />
        )) : 'Loading messages...'}
      </div>
      <form className={styles.chatForm} onSubmit={handleSubmit}>
      <input className={styles.chatFormInput} type='text' value={newMessage} onChange={e => setNewMessage(e.target.value)} />
        <button className={styles.chatFormButton} type='submit'>Send</button>
      </form>
    </div>
  );
};

export default Chat;





























