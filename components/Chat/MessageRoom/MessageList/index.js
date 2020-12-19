import React, { useRef, useEffect } from 'react';

//NextJS
import dynamic from 'next/dynamic';

//Component
const MessageItem = dynamic(() => import('./Message'));

// Common
const prefix = 'message__list';

const MessageList = ({ ...props }) => {
  const { messages } = props;
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const renderMessage = () => {
    return messages?.map(message => {
      return (
        <>
          <MessageItem key={message._id} message={message} />
          <div ref={messagesEndRef} />
        </>
      );
    });
  };

  return <section className={prefix}>{renderMessage()}</section>;
};

export default MessageList;
