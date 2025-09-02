import { useState } from "react";


const PrivateChats = () => {
  // Initial chats for each friend
  const [chats, setChats] = useState({
    "Affan": [
      { text: "Hello! 👋", type: "received" },
      { text: "Hi, how are you?", type: "sent" },
    ],
    "Danish": [
      { text: "Hey! Long time no see.", type: "received" },
    ],
    "Aryan": [
      { text: "Wanna catch up later? ☕", type: "received" },
    ],
    "Sana": [
      { text: "Sure, let's meet at 5 PM.", type: "sent" },
    ],
    
   
  });

  const [activeChat, setActiveChat] = useState("Affan");
  const [newMessage, setNewMessage] = useState("");

  // Handle message send
  const handleSend = () => {
    if (newMessage.trim() === "") return;

    setChats({
      ...chats,
      [activeChat]: [...chats[activeChat], { text: newMessage, type: "sent" }],
    });

    setNewMessage(""); // clear input
  };

  // Send message on Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div id="privatechats">
      <div className="whatsapp-container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">Chats</div>
          <div className="chat-list">
            {Object.keys(chats).map((friend) => (
              <div
                key={friend}
                className={`chat-item ${
                  activeChat === friend ? "active" : ""
                }`}
                onClick={() => setActiveChat(friend)}
              >
                {friend}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="chat-window">
          <div className="chat-header">{activeChat}</div>
          <div className="chat-messages">
            {chats[activeChat].map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateChats;
