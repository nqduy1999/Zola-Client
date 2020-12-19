/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// React Libary
import React, { useState, useContext } from 'react';
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  EllipsisOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import SideBarIcon from 'assets/svg/sidebar.svg';

// Redux
import { useDispatch } from 'react-redux';
import { editRoomNameAction } from 'actions/roomsAction';

import { useSelector } from 'react-redux';

// Common
import { ManagePeopleGroupContext } from 'components/common/context/ManagePeopleGroupContext';
import { InfoRoomContext } from 'components/common/context/InfoRoomContext';
import useRenderAvatar from 'components/common/hook/useRenderAvatar';
import { filterUserExitedRoom } from 'components/common/function/lodash';

const prefix = 'room_bar';

const RoomBar = () => {
  const dispatch = useDispatch();
  const [clickItemEdit, setClickItemEdit] = useState(false);
  const [valueInputEditRoomName, setValueInputEditRoomName] = useState('');
  const [isUpdateRoomNameSuccess, setIsUpdateRoomNameSuccess] = useState(false);
  const { setClickPeopleIcon, setClickSideBarIcon } = useContext(
    ManagePeopleGroupContext
  );
  const { infoRoom, statusRoom } = useContext(InfoRoomContext);
  const { userProfile } = useSelector(state => state.userData);
  const infoRoomClearUserExited = filterUserExitedRoom(infoRoom?.users);

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
  const [form] = Form.useForm();
  const handleClickEditGroupName = () => {
    setClickItemEdit(true);
    if (!isUpdateRoomNameSuccess) {
      form.setFieldsValue({
        name: infoRoom?.name
      });
    } else {
      form.setFieldsValue({
        name: valueInputEditRoomName
      });
    }
  };

  const handleUpdateRoomName = () => {
    if (Object.keys(infoRoom).length > 0) {
      const editName = {
        name: valueInputEditRoomName
      };
      dispatch(editRoomNameAction(infoRoom?._id, editName));
    }
    setClickItemEdit(false);
    setIsUpdateRoomNameSuccess(true);
  };

  const onFinish = values => {
    if (Object.keys(infoRoom).length > 0) {
      dispatch(editRoomNameAction(infoRoom?._id, values));
    }
    setClickItemEdit(false);
    setIsUpdateRoomNameSuccess(true);
  };

  const handleAvoidUpdateRoomName = () => {
    setClickItemEdit(false);
  };
  const checkInitialValue = () => {
    if (isUpdateRoomNameSuccess) {
      return {
        name: valueInputEditRoomName
      };
    } else {
      return {
        name: infoRoom?.name
      };
    }
  };

  const renderRoomBarGroup = (
    <>
      <div className="content_group_room">
        <div className="room_name">
          {!clickItemEdit ? (
            <h1>
              {!isUpdateRoomNameSuccess ? (
                <>{infoRoom?.name}</>
              ) : (
                <>{valueInputEditRoomName}</>
              )}
            </h1>
          ) : (
            <Form
              initialValues={checkInitialValue()}
              className="form_editName"
              onFinish={onFinish}
            >
              <Form.Item name="name">
                <Input
                  onChange={e => setValueInputEditRoomName(e.target.value)}
                />
              </Form.Item>
            </Form>
          )}
          {!clickItemEdit ? (
            <EditOutlined onClick={() => handleClickEditGroupName()} />
          ) : (
            <div className="after_clickEdit">
              <CloseOutlined onClick={() => handleAvoidUpdateRoomName()} />
              <CheckOutlined onClick={() => handleUpdateRoomName()} />
            </div>
          )}
        </div>
        <div className="info_user_room">
          <div className="count_user">
            <UserOutlined
              onClick={() => setClickPeopleIcon('clickPeopleIcon')}
            />
            <span>{infoRoomClearUserExited?.length}</span>
          </div>
        </div>
      </div>
      <div
        className="sidebar_icon"
        onClick={() => setClickSideBarIcon('clickSidebarIcon')}
      >
        <img src={SideBarIcon} alt="sidebar-icon" />
      </div>
    </>
  );

  const renderBarRoomFromContactList = () => {
    return (
      <div className="info_room" style={{ display: 'flex' }}>
        {infoRoom?.avatar === null || infoRoom?.avatar === '' ? (
          <Avatar
            size={64}
            className="avatar-chat"
            style={{
              backgroundColor: '#4287f5'
            }}
          >
            {infoRoom?.name}
          </Avatar>
        ) : (
          <img src={infoRoom.avatar} alt="avatar" id="avt-user" />
        )}
        <div className="content_room">
          <h1>{infoRoom?.name}</h1>
          <div className="info_user_room">
            <span style={{ fontSize: '13px', color: '#99a4b0' }}>
              Các bạn là bạn bè trên Zola
            </span>
          </div>
          <div
            className="action"
            style={{ position: 'absolute', right: '20px', top: '23px' }}
          >
            <Button
              icon={<EllipsisOutlined />}
              style={{ border: 'none' }}
            ></Button>
          </div>
        </div>
      </div>
    );
  };

  const renderBarRoomFromTabRoom = user => {
    return user?.map(user => {
      if (user?.id != userProfile?.id) {
        return (
          <div className="info_room" style={{ display: 'flex' }}>
            {user?.avatar === null || user?.avatar === '' ? (
              <Avatar
                size={64}
                className="avatar-chat"
                style={{
                  backgroundColor: '#4287f5'
                }}
              >
                {user?.name}
              </Avatar>
            ) : (
              <img src={user.avatar} alt="avatar" id="avt-user" />
            )}
            <div className="content_room">
              <h1>{user?.name}</h1>
              <div className="info_user_room">
                <span style={{ fontSize: '13px', color: '#99a4b0' }}>
                  Các bạn là bạn bè trên Zola
                </span>
              </div>
              <div
                className="action"
                style={{ position: 'absolute', right: '20px', top: '23px' }}
              >
                <Button
                  icon={<EllipsisOutlined />}
                  style={{ border: 'none' }}
                ></Button>
              </div>
            </div>
          </div>
        );
      }
    });
  };
  return (
    <nav className={prefix}>
      {statusRoom ? (
        <div className="info_room">
          <div className="friend-center-item-v2">
            <div className="avatar">{renderAvatarUserGroup()}</div>
          </div>
          {renderRoomBarGroup}
        </div>
      ) : infoRoom.active ? (
        renderBarRoomFromContactList()
      ) : (
        renderBarRoomFromTabRoom(infoRoom?.users)
      )}
    </nav>
  );
};

export default RoomBar;
