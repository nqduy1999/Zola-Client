/* eslint-disable react/prop-types */
// React Libary
import React from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button } from 'antd';

//Redux
import useRenderAvatar from 'components/common/hook/useRenderAvatar';

const prefix = 'room_bar';

const RoomBar = ({ ...props }) => {
  const { infoRoom, statusRoom } = props;
  const [renderAvatarUserGroup] = useRenderAvatar(
    infoRoom,
    {
      borderRadius: '50%',
      width: '35px',
      height: '35px',
      marginRight: '5px'
    },
    '35px'
  );

  const renderRoomBarGroup = (
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
  );

  return (
    <nav className={prefix}>
      {statusRoom ? (
        <div className="info_room">
          <div className="friend-center-item-v2">
            <div className="avatar">{renderAvatarUserGroup()}</div>
          </div>
          {renderRoomBarGroup}
        </div>
      ) : (
        <div className="info_room">
          {/* {userFind.avatar === null || userFind.avatar === '' ? (
            <Avatar size="70px" className="avatar-chat" name={userFind?.name} />
          ) : (
            <img src={userFind.avatar} alt="avatar" id="avt-user" />
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
          </div> */}
          XXXXXXXXXXXXXX
        </div>
      )}
    </nav>
  );
};

export default RoomBar;
