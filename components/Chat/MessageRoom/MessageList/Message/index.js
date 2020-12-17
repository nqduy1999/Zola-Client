/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import Avatar from 'react-avatar';

// Common
import { classPrefixor } from 'utils/classPrefixor';
import { InfoRoomContext } from 'components/common/context/InfoRoomContext';

const prefix = 'message';
const c = classPrefixor(prefix);
const Message = ({ ...props }) => {
  const [type, setType] = useState();
  const [isSentByCurrentUser, setIsSentByCurrentUser] = useState(false);
  const { infoRoom } = useContext(InfoRoomContext);
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
        {infoRoom.users?.find(user => user.id === message.user.id)?.avatar ===
          null ||
        infoRoom.users?.find(user => user.id === message.user.id)?.avatar ===
          '' ? (
          <Avatar
            size="50px"
            className="avatar"
            name={
              infoRoom.users?.find(user => user.id === message.user.id)?.name
            }
          />
        ) : (
          <img
            src={
              infoRoom.users?.find(user => user.id === message.user.id)?.avatar
            }
            alt="avatar"
          />
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
                ) : type == 'Image' ? (
                  <img src={message.content} />
                ) : type == 'Video' ? (
                  <video width="320" height="240" controls>
                    <source src={message.content} type="video/mp4" />
                  </video>
                ) : type == 'File' ? (
                  <a style={{ color: 'white' }} href={message.content}>
                    {message.content}
                  </a>
                ) : (
                  ''
                )}
                {convertDateTime(message.createdAt)}
              </div>
            </div>
          ) : (
            <div className="messageContainer justifyStart">
              <div>{renderUserAvatar}</div>
              <div className="messageBox backgroundLight">
                <p className="messageName">
                  {
                    infoRoom.users?.find(user => user.id === message.user.id)
                      ?.name
                  }
                </p>
                <p className="messageText colorDark">
                  {type === 'String' ? (
                    message.content
                  ) : type == 'Image' ? (
                    <img src={message.content} />
                  ) : type == 'Video' ? (
                    <video width="320" height="240" controls>
                      <source src={message.content} type="video/mp4" />
                    </video>
                  ) : type == 'File' ? (
                    <a href={message.content}>{message.content}</a>
                  ) : (
                    ''
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
