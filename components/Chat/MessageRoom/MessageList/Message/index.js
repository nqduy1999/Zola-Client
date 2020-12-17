/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from 'react-avatar';
import { Popover } from 'antd';

// Common
import { classPrefixor } from 'utils/classPrefixor';
import { InfoRoomContext } from 'components/common/context/InfoRoomContext';
import { SocketIOContext } from 'components/common/context/SocketIOContext';
import { getDetailGroupAction } from 'actions/roomsAction';

const prefix = 'message';
const c = classPrefixor(prefix);
const Message = ({ ...props }) => {
  const { message } = props;

  const [type, setType] = useState();
  const [isSentByCurrentUser, setIsSentByCurrentUser] = useState(false);
  const { infoRoom } = useContext(InfoRoomContext);
  const dispatch = useDispatch();
  const { userProfile } = useSelector(state => state.userData);
  const { socket } = useContext(SocketIOContext);

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

  const handleDeleteMess = () => {
    socket.emit('delete_message', message?._id);
    dispatch(getDetailGroupAction(infoRoom?._id));
  };

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

  const content = (
    <span
      className="delete--message"
      style={{ cursor: 'pointer' }}
      onClick={() => handleDeleteMess()}
    >
      Xóa tin nhắn
    </span>
  );

  const renderMessageItem = () => {
    return (
      <>
        <div className={c`item`}>
          {isSentByCurrentUser ? (
            <div className="messageContainer justifyEnd">
              <Popover
                className="messageBox backgroundBlue"
                placement="left"
                content={content}
              >
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
              </Popover>
            </div>
          ) : (
            <div className="messageContainer justifyStart">
              <div>{renderUserAvatar}</div>
              <Popover
                className="messageBox backgroundLight"
                content={content}
                placement="right"
              >
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
              </Popover>
            </div>
          )}
        </div>
      </>
    );
  };

  return <section className={prefix}>{renderMessageItem()}</section>;
};

export default Message;
