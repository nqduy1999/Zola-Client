/* eslint-disable react-hooks/exhaustive-deps */
// React Libary
import React, { useContext, useCallback, useState, useEffect } from 'react';
import { Input, Tag } from 'antd';
import Avatar from 'react-avatar';
import { LeftOutlined, UsergroupAddOutlined } from '@ant-design/icons';

// NextJS
import dynamic from 'next/dynamic';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Common
import { classPrefixor } from 'utils/classPrefixor';
import { ManagePeopleGroupContext } from 'components/common/context/ManagePeopleGroupContext';
import { InfoRoomContext } from 'components/common/context/InfoRoomContext';
import {
  dispatchDefaulMessagetAddUserToGroupAction,
  getDetailGroupAction
} from 'actions/roomsAction';
import { findUserByIdAction } from 'actions/userAction';

// Component
const ModalAddFriendToGroup = dynamic(() => import('./ModalAddFriendToGroup'));
// const ViewUserFriendByID = dynamic(() =>
//   import('components/Friend/ViewUserById')
// );
import ViewUserFriend from 'components/Friend/ViewUserFriend';

const prefix = 'manage__people';
const c = classPrefixor(prefix);
const { Search } = Input;

const ManagePeopleInGroup = () => {
  // React Hook
  const [valueSearch, setValueSearch] = useState('');
  const [showModalAddFriendToGroup, setShowModalAddFriendToGroup] = useState(
    false
  );
  const [userInGroupData, setUserInGroupData] = useState({});
  const [visibleModalViewUserById, setVisibleModalViewUserById] = useState(
    false
  );

  // Context
  const { setClickPeopleIcon } = useContext(ManagePeopleGroupContext);
  const { infoRoom, setInfoRoom } = useContext(InfoRoomContext);

  // Redux Hook
  const dispatch = useDispatch();
  const { userProfile } = useSelector(state => state.userData);
  const { listFriendContact } = useSelector(state => state.FriendReducer);
  const { infoRoomAfterAddUserToGroup } = useSelector(
    state => state.RoomsReducer
  );
  const { messageAddUserToGroup } = useSelector(state => state.RoomsReducer);

  // useEffect này chạy khi messageAddUserToGroup thay đổi, nghĩa là người dùng đã được add thành công
  useEffect(() => {
    if (messageAddUserToGroup.length > 0) {
      dispatch(getDetailGroupAction(infoRoom?._id));
    }
  }, [messageAddUserToGroup]);

  useEffect(() => {
    setInfoRoom(infoRoomAfterAddUserToGroup);
    // Sau khi set thì phải dispatch cho messageAddUserToGroup trở lại ban đầu để useEffect trên chạy lại
    dispatch(dispatchDefaulMessagetAddUserToGroupAction());
  }, [infoRoomAfterAddUserToGroup]);

  const handleSearchName = e => {
    setValueSearch(e.target.value);
  };

  const handleCheckAvatar = user => {
    const checkUserAvatar = user.avatar === null || user.avatar === '';
    if (checkUserAvatar) {
      return <Avatar name={user.name} size="50px" round={true} />;
    }
    return <img src={user.avatar} alt="avatar" className="avatar--user" />;
  };

  const findUserFriend = user => {
    return listFriendContact?.find(friend => friend.id === user.id);
  };

  const handleCheckStatusUser = user => {
    if (user.id === userProfile?.id) {
      return <Tag color="processing">Chính Bạn</Tag>;
    }
    if (findUserFriend(user)) {
      return <Tag color="success">Bạn Bè</Tag>;
    }
    if (findUserFriend(user) === undefined) {
      return <Tag color="error">Kết Bạn</Tag>;
    }
  };

  const userSearch = infoRoom?.users?.filter(
    user => user?.name?.toLowerCase().indexOf(valueSearch.toLowerCase()) !== -1
  );

  const handeGetUserIDInRoom = idUser => {
    dispatch(findUserByIdAction(idUser)).then(res => {
      setUserInGroupData(res.data);
      setVisibleModalViewUserById(true);
    });
  };

  const renderListUsersInGroup = useCallback(() => {
    return userSearch?.map(user => {
      return (
        <div
          className="user--info"
          key={user.id}
          onClick={() => handeGetUserIDInRoom(user.id)}
        >
          {handleCheckAvatar(user)}
          <span className="name--user">{user.name}</span>
          <span className="status--user">{handleCheckStatusUser(user)}</span>
        </div>
      );
    });
  }, [handleCheckStatusUser, userSearch]);

  const handleCloseModal = bool => {
    setShowModalAddFriendToGroup(bool);
  };
  const cancelModal = () => {
    setVisibleModalViewUserById(false);
  };
  return (
    <>
      <aside className={prefix}>
        <nav className={c`header`}>
          <span
            className="icon_out"
            onClick={() => setClickPeopleIcon('unClickPeopleIcon')}
          >
            <LeftOutlined />
          </span>
          <span className="title">
            <span>QUẢN LÝ THÀNH VIÊN</span>
          </span>
        </nav>
        <section className={c`content--top`}>
          <div
            className="addMemberInGroup"
            onClick={() => setShowModalAddFriendToGroup(true)}
          >
            <UsergroupAddOutlined />
            <span>Thêm Thành Viên</span>
          </div>
        </section>
        <section className={c`content--middle`}>
          <Search placeholder="Tìm Kiếm Bạn Bè" onChange={handleSearchName} />
          <div className="listUserInGroup">{renderListUsersInGroup()}</div>
        </section>
        {showModalAddFriendToGroup && (
          <ModalAddFriendToGroup
            showModalAddFriendToGroup={showModalAddFriendToGroup}
            handleCloseModalRoot={handleCloseModal}
          />
        )}
        {visibleModalViewUserById && (
          <ViewUserFriend
            userData={userInGroupData}
            visible={visibleModalViewUserById}
            onCancelModal={cancelModal}
          />
        )}
      </aside>
    </>
  );
};

export default ManagePeopleInGroup;
