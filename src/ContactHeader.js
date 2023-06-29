// ContactHeader.js
import React from 'react';

const ContactHeader = ({ selectedContact }) => {
  return (
    <div>
      <h2>{selectedContact.name}</h2>
    </div>
  );
};

export default ContactHeader;
