// src/components/Chat.jsx
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const messagesEndRef = useRef(null);
  const [targetUser, setTargetUser] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });
      
      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
          senderId: senderId?._id,
        };
      });
      
      if (chatMessages.length > 0) {
        const firstOtherMessage = chatMessages.find(msg => msg.senderId !== userId);
        if (firstOtherMessage) {
          setTargetUser({
            firstName: firstOtherMessage.firstName,
            lastName: firstOtherMessage.lastName,
          });
        }
      }
      
      setMessages(chatMessages);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();

    socket.emit("joinChat", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text, senderId }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { firstName, lastName, text, senderId },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      {/* Chat Header */}
      <div className="bg-slate-800/95 backdrop-blur-lg border-b border-slate-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            {/* Back Button */}
            <button
              onClick={() => window.history.back()}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200"
            >
              <svg className="w-6 h-6 text-slate-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>

            {/* User Avatar */}
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
              {targetUser?.firstName?.charAt(0) || "U"}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-white font-semibold text-lg">
                {targetUser ? `${targetUser.firstName} ${targetUser.lastName}` : "Loading..."}
              </h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="text-sm text-slate-400">Online</span>
              </div>
            </div>

            {/* Menu */}
            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200">
              <svg className="w-6 h-6 text-slate-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-white mb-2">No messages yet</h3>
              <p className="text-slate-400 text-sm">Send a message to start the conversation</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, index) => {
                const isMyMessage = msg.senderId === userId;
                return (
                  <div
                    key={index}
                    className={`flex ${isMyMessage ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex items-end space-x-2 max-w-md ${isMyMessage ? "flex-row-reverse space-x-reverse" : ""}`}>
                      {/* Avatar */}
                      {!isMyMessage && (
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {msg.firstName?.charAt(0)}
                        </div>
                      )}

                      {/* Message Bubble */}
                      <div>
                        {!isMyMessage && (
                          <p className="text-xs text-slate-500 mb-1 ml-2">
                            {msg.firstName} {msg.lastName}
                          </p>
                        )}
                        <div
                          className={`px-4 py-3 rounded-2xl ${
                            isMyMessage
                              ? "bg-blue-600 text-white rounded-br-sm"
                              : "bg-slate-700 text-white rounded-bl-sm"
                          }`}
                        >
                          <p className="text-sm leading-relaxed break-words">{msg.text}</p>
                        </div>
                        <p className={`text-xs text-slate-500 mt-1 ${isMyMessage ? "text-right mr-2" : "ml-2"}`}>
                          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-slate-800/95 backdrop-blur-lg border-t border-slate-700 sticky bottom-0">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-end space-x-3">
            {/* Attachment */}
            <button className="p-3 text-slate-400 hover:text-blue-400 hover:bg-slate-700 rounded-xl transition-all duration-200 mb-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>

            {/* Text Input */}
            <div className="flex-1 bg-slate-700 rounded-2xl border border-slate-600 focus-within:border-blue-500 transition-colors duration-200">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                rows="1"
                className="w-full px-4 py-3 bg-transparent text-white placeholder-slate-500 focus:outline-none resize-none max-h-32"
                style={{ minHeight: "48px" }}
              />
            </div>

            {/* Send Button */}
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none shadow-lg mb-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
