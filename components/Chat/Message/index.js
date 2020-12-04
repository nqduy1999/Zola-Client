import React from 'react';
// import { useSelector } from 'react-redux';

import { classPrefixor } from 'utils/classPrefixor';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
// import avatar from 'assets/images/avatar.jpg';
const prefix = 'message';
const c = classPrefixor(prefix);

const Message = ({ ...props }) => {
  const { infoRoom, message } = props;
  const { userFind, userProfile } = useSelector(state => state.userData);
  const renderSingleChat = () => {
    const getTimeMessage = message?.createdAt?.slice(0, 10);
    return message?.user.id == userProfile?.id ? (
      <div className="info_message_user_sent">
        <div className="message_content_user_sent">
          <div className="content_message">{message.content}</div>
          <div className="message-time">
            <span style={{ fontSize: '11px', color: '#99a4b0' }}>
              {getTimeMessage}
            </span>
          </div>
          <div className="action">
            <Button icon={<EllipsisOutlined />}></Button>
          </div>
        </div>
      </div>
    ) : (
      <div className="info_message_user_receive">
        {userFind.avatar === null || userFind.avatar === '' ? (
          <Avatar size="43px" className="avatar-chat" name={userFind?.name} />
        ) : (
          <img
            style={{
              borderRadius: '50%',
              width: '43px',
              height: '43px',
              marginRight: '11px'
            }}
            src={userFind.avatar}
            alt="avatar"
          />
        )}
        <div className="message_content_user_received">
          <span
            className="name_user"
            style={{ fontSize: '13px', color: '#99a4b0' }}
          >
            {userFind?.name}
          </span>
          <div className="content_message">{message.content}</div>
          <div className="message-time">
            <span style={{ fontSize: '11px', color: '#99a4b0' }}>
              {getTimeMessage}
            </span>
          </div>
        </div>
      </div>
    );
  };
  const renderGroupChat = () => {
    const getTimeMessage = message?.createdAt?.slice(0, 10);
    return message?.user.id == userProfile?.id ? (
      <div className="info_message_user_sent">
        <div className="message_content_user_sent">
          <div className="content_message">{message.content}</div>
          <div className="message-time">
            <span style={{ fontSize: '11px', color: '#99a4b0' }}>
              {getTimeMessage}
            </span>
          </div>
          <div className="action">
            <Button icon={<EllipsisOutlined />}></Button>
          </div>
        </div>
      </div>
    ) : (
      <div className="info_message_user_receive">
        {userFind.avatar === null || userFind.avatar === '' ? (
          <Avatar size="43px" className="avatar-chat" name={userFind?.name} />
        ) : (
          <img
            style={{
              borderRadius: '50%',
              width: '43px',
              height: '43px',
              marginRight: '11px'
            }}
            src={userFind.avatar}
            alt="avatar"
          />
        )}
        <div className="message_content_user_received">
          <span
            className="name_user"
            style={{ fontSize: '13px', color: '#99a4b0' }}
          >
            {userFind?.name}
          </span>
          <div className="content_message">{message.content}</div>
          <div className="message-time">
            <span style={{ fontSize: '11px', color: '#99a4b0' }}>
              {getTimeMessage}
            </span>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className={c`main`}>
      {infoRoom.group ? renderGroupChat() : renderSingleChat()}
    </div>
  );
};
export default Message;
Message.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  data: PropTypes.any,
  infoRoom: PropTypes.any,
  message: PropTypes.any
};

Message.defaultProps = {
  children: {}
};
