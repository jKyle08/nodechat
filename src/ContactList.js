// ContactList.js
import React from 'react';

const ContactList = ({ contacts, onSelectContact }) => {
  return (
    <div>
      <h2>Contact List</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id} onClick={() => onSelectContact(contact)}>
            {contact.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
