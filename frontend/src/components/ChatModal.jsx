import React, { useState, useEffect, useRef } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import io from 'socket.io-client';

const ChatModal = ({ gig, user, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
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

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '15px',
        width: '500px',
        maxWidth: '90%',
        height: '600px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ marginBottom: '5px', color: '#333', margin: '0 0 5px 0' }}>
              {gig.title}
            </h3>
            <p style={{ color: '#999', fontSize: '0.9rem', margin: 0 }}>
              {gig.userName}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#999',
              padding: '5px'
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Messages Area */}
        <div style={{
          flex: 1,
          padding: '20px',
          overflowY: 'auto',
          background: '#f8f9fa'
        }}>
          {messages.length === 0 ? (
            <div style={{
              textAlign: 'center',
              color: '#999',
              padding: '40px 20px'
            }}>
              <MessageCircle 
                size={48} 
                style={{ margin: '0 auto 15px', opacity: 0.3, display: 'block' }} 
              />
              <p style={{ margin: 0 }}>Start a conversation!</p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} style={{
                marginBottom: '15px',
                display: 'flex',
                justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start'
              }}>
                <div style={{
                  background: msg.sender === 'me' ? '#667eea' : 'white',
                  color: msg.sender === 'me' ? 'white' : '#333',
                  padding: '12px 16px',
                  borderRadius: '15px',
                  maxWidth: '70%',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}>
                  <div>{msg.text}</div>
                  <div style={{
                    fontSize: '0.75rem',
                    marginTop: '5px',
                    opacity: 0.7
                  }}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{
          padding: '20px',
          borderTop: '1px solid #e0e0e0',
          display: 'flex',
          gap: '10px'
        }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '25px',
              border: '1px solid #ddd',
              fontSize: '1rem'
            }}
          />
          <button
            onClick={handleSend}
            style={{
              background: '#667eea',
              color: 'white',
              border: 'none',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.target.style.background = '#5568d3'}
            onMouseOut={(e) => e.target.style.background = '#667eea'}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;