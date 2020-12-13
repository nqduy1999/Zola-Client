/* eslint-disable react-hooks/exhaustive-deps */
// React Libary
import React, { useContext, useCallback, useState } from 'react';
import { Input, Tag } from 'antd';
import Avatar from 'react-avatar';
import { LeftOutlined, UsergroupAddOutlined } from '@ant-design/icons';

// NextJS
import dynamic from 'next/dynamic';

// Redux
import { useSelector } from 'react-redux';

// Common
import { classPrefixor } from 'utils/classPrefixor';
import { ManagePeopleGroupContext } from 'components/common/context/ManagePeopleGroupContext';
import { InfoRoomContext } from 'components/common/context/InfoRoomContext';

// Component
const ModalAddFriendToGroup = dynamic(() => import('./ModalAddFriendToGroup'));

const prefix = 'manage__people';
const c = classPrefixor(prefix);
const { Search } = Input;

const ManagePeopleInGroup = () => {
  const [valueSearch, setValueSearch] = useState('');
  const [showModalAddFriendToGroup, setShowModalAddFriendToGroup] = useState(
    false
  );
  const { setClickPeopleIcon } = useContext(ManagePeopleGroupContext);
  const { infoRoom } = useContext(InfoRoomContext);
  const { userProfile } = useSelector(state => state.userData);
  const { listFriendContact } = useSelector(state => state.FriendReducer);

  const handleSearchName = e => {
    setValueSearch(e.target.value);
  };

  const handleCheckAvatar = user => {
    if (user.avatar === null || user.avatar === '') {
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
    user => user.name.toLowerCase().indexOf(valueSearch.toLowerCase()) !== -1
  );

  const renderListUsersInGroup = useCallback(() => {
    return userSearch?.map(user => {
      return (
        <div className="user--info" key={user.id}>
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
      </aside>
    </>
  );
};

export default ManagePeopleInGroup;