"use client";
import React from 'react';
import '@/styles/pages/Forums.scss';

function Forums() {
  const chatrooms = [
    { id: 1, name: "Organic Farming Tips", topic: "Discuss organic farming practices and share tips.", link: "/forums/organic-farming" },
    { id: 2, name: "Crop Rotation Strategies", topic: "Learn and share crop rotation techniques.", link: "/forums/crop-rotation" },
    { id: 3, name: "Livestock Management", topic: "Talk about livestock care and management.", link: "/forums/livestock" },
    { id: 4, name: "Soil Health & Fertilizers", topic: "Discuss soil health and the best fertilizers to use.", link: "/forums/soil" },
    { id: 5, name: "Farm Equipment Reviews", topic: "Share reviews and experiences with farm equipment.", link: "/forums/equipments" },
  ];

  return (
    <div className="forums-container">
      <h1 className="forums-title font-bold">Farmer's Forum</h1>
      <p className="forums-description font-semibold tracking-wider">Join the conversation and connect with fellow farmers!</p>
      <div className="chatrooms-list">
        {chatrooms.map((room) => (
          <div key={room.id} className="chatroom-card">
            <h2 className="chatroom-name font-semibold">{room.name}</h2>
            <p className="chatroom-topic">{room.topic}</p>
            <button onClick={() => window.location.href = `${room.link}`} className="join-button">Join Chatroom</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forums;