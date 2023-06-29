// ChatComposer.js
import React, { useState } from 'react';

const ChatComposer = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    // Perform any message validation or formatting
    // ...

    // Call the onSendMessage callback with the composed message
    onSendMessage(message);

    // Clear the input field
    setMessage('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Type your message"
        value={message}
        onChange={handleMessageChange}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatComposer;
