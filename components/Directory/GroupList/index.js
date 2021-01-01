/* eslint-disable react-hooks/exhaustive-deps */
// React Libary
import React, { useEffect } from 'react';
import { Button } from 'antd';
import { toast } from 'react-toastify';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  dispatchDefaultAction,
  exitGroupChatAction
} from 'actions/groupAction';
import { getListMessage } from 'actions/messageAction';

// Common
import { classPrefixor } from 'utils/classPrefixor';
import useFetchAllGroup from 'components/common/hook/useFetchAllGroup';
import useRenderAvatar from 'components/common/hook/useRenderAvatar';
import { filterUserExitedRoom } from 'components/common/function/lodash';

const prefix = 'groupList';
const c = classPrefixor(prefix);

const GroupList = () => {
  const dispatch = useDispatch();
  const { messageExitGroup } = useSelector(state => state.GroupReducer);

  const { listGroup } = useFetchAllGroup();

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

  const RenderAvatarUserGroup = group => {
    const [renderAvatarUserGroup] = useRenderAvatar(
      group,
      {
        borderRadius: '50%',
        width: '62px',
        height: '62px',
        marginRight: '11px'
      },
      '62px'
    );
    return renderAvatarUserGroup();
  };

  const renderNumberUserInGroup = group => {
    const infoRoomClearUserExited = filterUserExitedRoom(group?.users);
    return infoRoomClearUserExited?.length;
  };

  const renderListGroup = () => {
    return listGroup?.map(item => {
      return (
        <>
          {item.group && (
            <div className="friend-center-item-v2">
              <div className="avatar">{RenderAvatarUserGroup(item)}</div>
              <div className="truncate">{item.name}</div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                  style={{
                    marginTop: 4,
                    fontSize: 14,
                    color: 'rgb(130, 130, 130)'
                  }}
                >
                  {renderNumberUserInGroup(item)} Thành Viên
                </div>
              </div>
              <Button
                type="primary"
                onClick={() => handleExitGroup(item._id)}
                style={{ borderRadius: '5px' }}
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
      <div className={c`header`}>
        <img
          src="https://zalo-chat-static.zadn.vn/v1/group@2x.png"
          alt="imgAddF"
        />
        <span>Danh Sách Nhóm</span>
      </div>
      <section
        className={prefix}
        style={{
          top: '120px',
          left: '400px',
          position: 'absolute'
        }}
      >
        {listGroup.length > 0 ? (
          <div className={c`content`}>
            <div className={c`content__inside`}>
              <div className="scroll-list">{renderListGroup()}</div>
            </div>
          </div>
        ) : (
          ''
        )}
      </section>
    </>
  );
};

export default GroupList;
