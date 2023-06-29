import React from 'react';

const ChatHistory = ({ selectedContact, chatHistory }) => {
  return (
    <div>
      {selectedContact && selectedContact.name && (
        <h2>Chat History with {selectedContact.name}</h2>
      )}
      <ul>
        {chatHistory.map((message) => (
          <li key={message.id}>
            <strong>{message.sender}: </strong>
            {message.message} {/* Update to access the correct property */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatHistory;
