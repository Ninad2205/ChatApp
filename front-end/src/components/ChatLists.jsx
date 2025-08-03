import React from "react";

const ChatLists = ({ chats }) => {
  const user = localStorage.getItem("user");

  function SenderChat({ message, username, avatar }) {
    return (
      <div className="sender_chat">
        <p className="sender_message">
          <strong>{username}</strong>
          {message}
        </p>
        <img
          className="chat_avatar"
          src={avatar}
          alt={`${username}'s avatar`}
        />
      </div>
    );
  }

  function ReceiverChat({ message, username, avatar }) {
    return (
      <div className="receiver_chat">
        <img
          className="chat_avatar"
          src={avatar}
          alt={`${username}'s avatar`}
        />
        <p className="receiver_message">
          <strong>{username}</strong>
          {message}
        </p>
      </div>
    );
  }

  return (
    <div>
      {chats.map((chat, index) => {
        if (chat.user === user) {
          return (
            <SenderChat
              key={index}
              message={chat.message}
              username={chat.user}
              avatar={chat.avatar}
            />
          );
        } else {
          return (
            <ReceiverChat
              key={index}
              message={chat.message}
              username={chat.user}
              avatar={chat.avatar}
            />
          );
        }
      })}
    </div>
  );
};

export default ChatLists;
