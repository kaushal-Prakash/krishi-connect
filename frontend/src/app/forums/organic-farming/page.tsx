"use client"
import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type Message = {
  message: string;
  sender: string;
  timestamp: Date;
};

const OrganicFarming = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const roomName = 'organic-farming';

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:5000/chat', {
      withCredentials: true,
    });
    
    setSocket(newSocket);

    // Join the organic-farming room
    newSocket.emit('join_room', roomName);

    // Listen for private messages in this room
    newSocket.on('private_message', (data: Message) => {
      setMessages(prev => [...prev, data]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() && socket) {
      // Send message to the organic-farming room
      socket.emit('private_message', {
        roomId: roomName,
        message: newMessage
      });
      
      // Add the message to local state immediately
      setMessages(prev => [...prev, {
        message: newMessage,
        sender: 'You',
        timestamp: new Date()
      }]);
      
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Organic Farming Discussion</h1>
      
      <div className="bg-white rounded-lg shadow p-4 mb-4 h-96 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-3 p-2 bg-gray-50 rounded">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>{msg.sender}</span>
              <span>{msg.timestamp.toLocaleTimeString()}</span>
            </div>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 border rounded p-2"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default OrganicFarming;