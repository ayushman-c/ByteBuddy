import React, { useState, useEffect, useRef } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import io from 'socket.io-client';
import './ChatModal.css';

const ChatModal = ({ gig, user, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const socketUrl = import.meta.env.VITE_SOCKET_URL || 'https://bytebuddy-backend-ejyc.onrender.com';
    const newSocket = io(socketUrl);
    socketRef.current = newSocket;

    newSocket.emit('join-chat', gig._id);

    newSocket.on('receive-message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => newSocket.close();
  }, [gig._id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim() || !socketRef.current) return;

    const message = {
      gigId: gig._id,
      senderId: user.dbUser?._id,
      receiverId: gig.userId,
      text: newMessage,
      sender: 'me',
      time: new Date().toLocaleTimeString()
    };

    socketRef.current.emit('send-message', message);
    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chat-modal-overlay" onClick={onClose}>
      <div className="chat-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="chat-modal-header">
          <div>
            <h3 className="chat-modal-gig-title">{gig.title}</h3>
            <p className="chat-modal-gig-author">{gig.userName}</p>
          </div>
          <button onClick={onClose} className="chat-modal-close-button">
            <X size={24} />
          </button>
        </div>

        <div className="chat-modal-messages">
          {messages.length === 0 ? (
            <div className="chat-modal-empty">
              <MessageCircle size={48} className="chat-modal-empty-icon" />
              <p>Start a conversation!</p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`chat-modal-message-wrapper ${
                  msg.sender === 'me' 
                    ? 'chat-modal-message-wrapper-sent' 
                    : 'chat-modal-message-wrapper-received'
                }`}
              >
                <div className={`chat-modal-message ${
                  msg.sender === 'me' 
                    ? 'chat-modal-message-sent' 
                    : 'chat-modal-message-received'
                }`}>
                  <div>{msg.text}</div>
                  <div className="chat-modal-message-time">{msg.time}</div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-modal-input-area">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="chat-modal-input"
          />
          <button onClick={handleSend} className="chat-modal-send-button">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;