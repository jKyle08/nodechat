import React, { useState, useEffect } from 'react';
import Login from './Login';
import ContactList from './ContactList';
import ContactHeader from './ContactHeader';
import ChatHistory from './ChatHistory';
import ChatComposer from './ChatComposer';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  // Function to handle login
  const handleLogin = (username) => {
    setLoggedIn(true);
    setUsername(username);
    // Perform any necessary logic after login, e.g., fetching contacts
    fetchContacts();
  };

  // Function to fetch contacts
  const fetchContacts = () => {
    // Simulated API call to fetch contacts
    const simulatedContacts = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Alice' },
      { id: 3, name: 'Bob' },
    ];
    setContacts(simulatedContacts);
  };

  // Function to handle selecting a contact
  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    // Perform any necessary logic, e.g., fetching chat history
    fetchChatHistory(contact);
  };

  const fetchChatHistory = (contact) => {
    // Simulated API call to fetch chat history
    const simulatedChatHistory = [
      { id: 1, sender: 'John', message: 'Hello' },
      { id: 2, sender: 'Alice', message: 'Hi there!' },
    ];
    setChatHistory(simulatedChatHistory);
  };

  // Function to handle sending a message
  const handleSendMessage = (message) => {
    // Perform any necessary logic, e.g., sending the message to the server
    const newMessage = {
      id: chatHistory.length + 1,
      sender: username,
      message: message,
    };
    setChatHistory([...chatHistory, newMessage]);
    // Send the message to the server
    socket.emit('message', newMessage);
  };

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on('message', (message) => {
      setChatHistory((prevChatHistory) => [...prevChatHistory, message]);
    });

    // Clean up the event listener on component unmount
    return () => {
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    // Listen for new users joining
    socket.on('userJoined', (user) => {
      setContacts((prevContacts) => [...prevContacts, user]);
    });

    // Listen for users leaving
    socket.on('userLeft', (userId) => {
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== userId)
      );
    });

    // Clean up the event listeners on component unmount
    return () => {
      socket.off('userJoined');
      socket.off('userLeft');
    };
  }, []);

  return (
    <div className="app">
      {!loggedIn ? (
        // Render login component if not logged in
        <Login onLogin={handleLogin} />
      ) : (
        // Render chat components if logged in
        <div>
          <ContactList contacts={contacts} onSelectContact={handleSelectContact} />
          {selectedContact && selectedContact.name && (
            <div>
              <ContactHeader selectedContact={selectedContact} />
              <ChatHistory chatHistory={chatHistory} />
              <ChatComposer onSendMessage={handleSendMessage} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
