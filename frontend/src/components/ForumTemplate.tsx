"use client";
import React, { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import {
  FaUser,
  FaPaperPlane,
  FaSeedling,
  FaSpinner,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

type Message = {
  message: string;
  sender: string;
  timestamp: Date;
  isYou?: boolean;
  tempId?: string;
};

const ForumTemplate = ({
  title,
  description,
  roomName,
}: {
  title: string;
  description: string;
  roomName: string;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>("");
    const [socket, setSocket] = useState<Socket | null>(null);
    const [senderId, setSenderId] = useState<string>("");
    const [isSending, setIsSending] = useState(false);
    const [isNearBottom, setIsNearBottom] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      // Initialize socket connection
      const newSocket = io(
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
        {
          withCredentials: true,
          transports: ["websocket"],
        }
      );
  
      setSocket(newSocket);
  
      newSocket.on("connect", () => {
        setSenderId(newSocket.id || "");
        newSocket.emit("join_room", roomName);
      });
  
      newSocket.on("private_message", (data: Message) => {
        // Filter out any temporary messages with matching content
        setMessages((prev) => [
          ...prev.filter((msg) => !msg.tempId || msg.message !== data.message),
          {
            ...data,
            isYou: data.sender === newSocket.id,
          },
        ]);
      });
  
      return () => {
        newSocket.disconnect();
      };
    }, []);
  
    // Track scroll position
    useEffect(() => {
      const messagesContainer = document.querySelector(".messages-container");
      if (!messagesContainer) return;
  
      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = messagesContainer;
        const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
        setIsNearBottom(distanceFromBottom < 100);
      };
  
      messagesContainer.addEventListener("scroll", handleScroll);
      return () => messagesContainer.removeEventListener("scroll", handleScroll);
    }, []);
  
    // Conditional auto-scroll
    useEffect(() => {
      if (isNearBottom && messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages, isNearBottom]);
  
    const handleSendMessage = async () => {
      if (!newMessage.trim() || !socket || isSending) return;
  
      setIsSending(true);
      const tempMessageId = Date.now().toString();
  
      // Optimistic UI update
      setMessages((prev) => [
        ...prev,
        {
          message: newMessage,
          sender: senderId,
          timestamp: new Date(),
          isYou: true,
          tempId: tempMessageId,
        },
      ]);
  
      try {
        socket.emit("private_message", {
          roomId: roomName,
          message: newMessage,
        });
  
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages((prev) => prev.filter((msg) => msg.tempId !== tempMessageId));
      } finally {
        setIsSending(false);
      }
    };
  
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !isSending) {
        handleSendMessage();
      }
    };
  
    // Animation variants
    const messageVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-0 md:p-8">
        <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-none md:rounded-xl shadow-lg overflow-hidden h-screen md:h-auto"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 p-4 md:p-6 text-white flex items-center">
          <FaSeedling className="text-2xl md:text-3xl mr-3" />
          <div>
            <h1 className="text-xl md:text-2xl font-bold">
              {title}
            </h1>
            <p className="text-green-100 text-xs md:text-sm">
              {description}
            </p>
          </div>
        </div>

        {/* Chat Container */}
        <div className="p-4 h-[calc(100vh-180px)] md:h-[400px] overflow-y-auto bg-green-50 messages-container">
          {messages.map((msg, index) => {
            // Ensure timestamp is Date object
            const timestamp =
              typeof msg.timestamp === "string"
                ? new Date(msg.timestamp)
                : msg.timestamp;

            return (
              <motion.div
                key={msg.tempId || `${index}-${timestamp.getTime()}`}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3 }}
                className={`mb-4 flex ${
                  msg.isYou ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] md:max-w-md rounded-lg p-3 ${
                    msg.isYou
                      ? "bg-green-600 text-white"
                      : "bg-white border border-green-200"
                  }`}
                >
                  <div className="flex items-center mb-1">
                    <div
                      className={`p-1 rounded-full mr-2 ${
                        msg.isYou ? "bg-green-700" : "bg-green-100"
                      }`}
                    >
                      <FaUser
                        className={msg.isYou ? "text-white" : "text-green-600"}
                        size={12}
                      />
                    </div>
                    <span className="text-xs font-medium">
                      {msg.isYou ? "You" : "Community Member"}
                    </span>
                  </div>
                  <p className="text-sm">{msg.message}</p>
                  <div
                    className={`text-xs mt-1 text-right ${
                      msg.isYou ? "text-green-200" : "text-gray-500"
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 md:p-4 border-t border-green-200 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 border border-green-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
              placeholder="Type your message..."
              disabled={isSending}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors w-10 h-10 flex items-center justify-center"
              disabled={!newMessage.trim() || isSending}
            >
              {isSending ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaPaperPlane />
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForumTemplate;
