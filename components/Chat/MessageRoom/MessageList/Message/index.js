/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Avatar from 'react-avatar';

// Common
import { classPrefixor } from 'utils/classPrefixor';

const prefix = 'message';
const c = classPrefixor(prefix);
const Message = ({ ...props }) => {
  const [type, setType] = useState();
  const [isSentByCurrentUser, setIsSentByCurrentUser] = useState(false);

  const { userProfile } = useSelector(state => state.userData);

  const { message } = props;

  useEffect(() => {
    if (message?.user?.id === userProfile?.id) {
      setIsSentByCurrentUser(true);
    }
  }, []);

  useEffect(() => {
    if (message) {
      setType(message.type);
    }
  }, [message]);

  const convertDateTime = date => {
    const newDate = new Date(date);
    return (
      <>
        <p className="timeChatting">{`${newDate.getHours()}:${newDate.getMinutes()}`}</p>
      </>
    );
  };

  const renderUserAvatar = (
    <div className="user-center-item-v2">
      <div className="avatar avatar--huge">
        {message?.user.avatar === null || message?.user.avatar === '' ? (
          <Avatar size="50px" className="avatar" name={message?.user.name} />
        ) : (
          <img src={message?.user.avatar} alt="avatar" />
        )}
      </div>
    </div>
  );

  const renderMessageItem = () => {
    return (
      <>
        <div className={c`item`}>
          {isSentByCurrentUser ? (
            <div className="messageContainer justifyEnd">
              <div className="messageBox backgroundBlue">
                {type === 'String' ? (
                  message.content
                ) : (
                  <img src={message.content} />
                )}
                {convertDateTime(message.createdAt)}
              </div>
            </div>
          ) : (
            <div className="messageContainer justifyStart">
              <div>{renderUserAvatar}</div>
              <div className="messageBox backgroundLight">
                <p className="messageText colorDark">
                  {type === 'String' ? (
                    message.content
                  ) : (
                    <img src={message.content} />
                  )}
                  {convertDateTime(message.createdAt)}
                </p>
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  return <section className={prefix}>{renderMessageItem()}</section>;
};

export default Message;
