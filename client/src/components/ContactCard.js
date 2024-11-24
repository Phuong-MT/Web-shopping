import React from 'react';

const ContactCard = ({ icon, title, content }) => {
  return (
    <div className="flex items-start p-4 bg-white rounded-lg shadow-md">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full">
        {icon}
      </div>
      <div className="ml-4">
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );
};

export default ContactCard;
