import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { classPrefixor } from 'utils/classPrefixor';
import { EllipsisOutlined } from '@ant-design/icons';
import Avatar from 'react-avatar';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Message from '../Message';
import InputChat from './InputChat';

const prefix = 'message-room';
const c = classPrefixor(prefix);
const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;

const MessageRoom = ({ ...props }) => {
  const { infoRoom, statusRoom } = props;
  const [messageList, setMessageList] = useState([]);
  useEffect(() => {
    if (infoRoom?.messages) {
      setMessageList(infoRoom.messages);
    }
  }, [infoRoom.messages]);
  const renderAvatarUserGroup = item => {
    const arrayImage = item?.users?.slice(0, 4);
    return (
      <>
        {arrayImage?.map(user => {
          return (
            <>
              <div className="userInfo">
                {user.avatar === null || user.avatar === '' ? (
                  <Avatar
                    className="avatar-user"
                    size="32.5px"
                    name={user.name}
                  />
                ) : (
                  <img
                    style={{
                      borderRadius: '50%',
                      width: '32.5px',
                      height: '32.5px'
                    }}
                    src={user.avatar}
                    alt="avatar"
                  />
                )}
              </div>
            </>
          );
        })}
      </>
    );
  };
  const { userFind, isLoading } = useSelector(state => state.userData);
  return isLoading ? (
    <div className="scroll-chat">
      <Spin
        indicator={antIcon}
        size="large"
        style={{ marginTop: '250px', marginLeft: '400px' }}
      />
    </div>
  ) : (
    <section className={prefix}>
      <div className={c`header`}>
        {statusRoom ? (
          <div className="info_room">
            <div className="friend-center-item-v2">
              <div className="avatar">{renderAvatarUserGroup(infoRoom)}</div>
            </div>
            <div className="content_group_room">
              <h1>{infoRoom?.name}</h1>
              <div className="info_user_room">
                <span style={{ fontSize: '13px', color: '#99a4b0' }}>
                  Có người {infoRoom?.users?.length} tham gia cuộc trò chuyện
                </span>
              </div>
              <div className="action">
                <Button icon={<EllipsisOutlined />}></Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="info_room">
            {userFind.avatar === null || userFind.avatar === '' ? (
              <Avatar
                size="70px"
                className="avatar-chat"
                name={userFind?.name}
              />
            ) : (
              <img
                style={{
                  borderRadius: '50%',
                  width: '70px',
                  height: '70px',
                  marginRight: '11px'
                }}
                src={userFind.avatar}
                alt="avatar"
              />
            )}
            <div className="content_room">
              <h1>{userFind?.name}</h1>
              <div className="info_user_room">
                <span style={{ fontSize: '13px', color: '#99a4b0' }}>
                  Các bạn là bạn bè trên Zola
                </span>
              </div>
              <div className="action">
                <Button icon={<EllipsisOutlined />}></Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={c`content`}>
        <div className="scroll-chat">
          {messageList.map((mess, key) => {
            return (
              <Message key={key} message={mess} infoRoom={infoRoom}></Message>
            );
          })}
        </div>
      </div>
      <div className={c`icon_chat_tab`}>
        <div className={`content__inside`}>
          <Button>
            <i className="fa fa-image"></i>
          </Button>
          <Button>
            <i className="fa fa-paperclip"></i>
          </Button>
        </div>
      </div>
      <hr style={{ background: 'rgba(0, 0, 0, 0.1)' }} />
      <InputChat />
    </section>
  );
};
export default MessageRoom;
