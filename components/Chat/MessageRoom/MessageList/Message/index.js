/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Common
import { classPrefixor } from 'utils/classPrefixor';

const prefix = 'message';
const c = classPrefixor(prefix);
const Message = ({ ...props }) => {
  const [isSentByCurrentUser, setIsSentByCurrentUser] = useState(false);

  const { userProfile } = useSelector(state => state.userData);

  const { message } = props;

  useEffect(() => {
    if (message?.user?.id === userProfile?.id) {
      setIsSentByCurrentUser(true);
    }
  }, []);

  const convertDateTime = date => {
    const newDate = new Date(date);
    return (
      <>
        <p className="timeChatting">{`${newDate.getHours()}:${newDate.getMinutes()}`}</p>
      </>
    );
  };

  const renderMessageItem = () => {
    return (
      <>
        <div className={c`item`}>
          {isSentByCurrentUser ? (
            <div className="messageContainer justifyEnd">
              <div className="messageBox backgroundBlue">
                {message.content}
                {convertDateTime(message.createdAt)}
              </div>
            </div>
          ) : (
            <div className="messageContainer justifyStart">
              <div className="messageBox backgroundLight">
                <p className="messageText colorDark">
                  {message.content}
                  {convertDateTime(message.createdAt)}
                </p>
              </div>
              <p className="sentText pl-10">{message?.user?.name}</p>
            </div>
          )}
        </div>
      </>
    );
  };

  return <section className={prefix}>{renderMessageItem()}</section>;
};

export default Message;
