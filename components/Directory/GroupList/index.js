/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { classPrefixor } from 'utils/classPrefixor';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Avatar } from 'antd';
import {
  dispatchDefaultAction,
  exitGroupChatAction
} from 'actions/groupAction';
import { getListMessage } from 'actions/messageAction';
import { toast } from 'react-toastify';
import { UserOutlined } from '@ant-design/icons';

const prefix = 'groupList';
const c = classPrefixor(prefix);

const GroupList = () => {
  const dispatch = useDispatch();
  const { messageRooms } = useSelector(state => state.messageData);
  const { messageExitGroup, idGroup } = useSelector(
    state => state.GroupReducer
  );

  const handleExitGroup = id => {
    dispatch(exitGroupChatAction(id));
  };

  useEffect(() => {
    if (messageExitGroup?.length > 0) {
      toast.success(`${messageExitGroup}`, {
        position: 'top-right',
        autoClose: 2000
      });
      dispatch(getListMessage(1));
    }
    dispatch(dispatchDefaultAction());
  }, [messageExitGroup]);

  useEffect(() => {
    dispatch(getListMessage(1));
  }, [idGroup]);

  const renderAvatarUserGroup = item => {
    const arrayImage = item?.users?.slice(0, 4);
    return (
      <>
        {arrayImage.map(user => {
          return (
            <>
              <div className="userInfo">
                {user.avatar === null || user.avatar === '' ? (
                  <Avatar
                    size="large"
                    icon={<UserOutlined />}
                    style={{ marginRight: '10px' }}
                  />
                ) : (
                  <img
                    style={{
                      borderRadius: '50%',
                      width: '62px',
                      height: '62px',
                      marginRight: '11px'
                    }}
                    src={`https://minhtruong.s3.ap-southeast-1.amazonaws.com/${user.avatar}`}
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
  const renderListGroup = () => {
    return messageRooms?.map(item => {
      return (
        <>
          {item.group && (
            <div className="friend-center-item-v2">
              <div className="avatar">{renderAvatarUserGroup(item)}</div>
              <div className="truncate">{item.name}</div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                  style={{
                    marginTop: 4,
                    fontSize: 14,
                    color: 'rgb(130, 130, 130)'
                  }}
                >
                  {item?.users.length} Thành Viên
                </div>
              </div>
              <Button
                type="primary"
                danger
                onClick={() => handleExitGroup(item._id)}
              >
                Rời Khỏi Nhóm
              </Button>
            </div>
          )}
        </>
      );
    });
  };
  return (
    <>
      <section className={prefix}>
        <div className={c`header`}>
          <img
            src="https://zalo-chat-static.zadn.vn/v1/group@2x.png"
            alt="imgAddF"
          />
          <span>Danh Sách Nhóm</span>
        </div>
        <div className={c`content`} style={{ paddingLeft: '100px' }}>
          <div className={c`content__inside`}>{renderListGroup()}</div>
        </div>
      </section>
    </>
  );
};

export default GroupList;
