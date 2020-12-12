import React, { useContext, useCallback } from 'react';
import { Input } from 'antd';
import Avatar from 'react-avatar';
import { LeftOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { classPrefixor } from 'utils/classPrefixor';
import { ManagePeopleGroupContext } from 'components/common/context/ManagePeopleGroupContext';
import { InfoRoomContext } from 'components/common/context/InfoRoomContext';

const prefix = 'manage__people';
const c = classPrefixor(prefix);
const { Search } = Input;

const ManagePeopleInGroup = () => {
  const { setClickPeopleIcon } = useContext(ManagePeopleGroupContext);
  const { infoRoom } = useContext(InfoRoomContext);

  const onSearch = value => {
    console.log(value);
  };

  const renderListUsersInGroup = useCallback(() => {
    return infoRoom?.users?.map(user => {
      return (
        <div className="user--info" key={user.id}>
          <Avatar name={user.name} />
          <span>{user.name}</span>
        </div>
      );
    });
  }, [infoRoom?.users]);

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
          <div className="addMemberInGroup">
            <UsergroupAddOutlined />
            <span>Thêm Thành Viên</span>
          </div>
        </section>
        <section className={c`content--middle`}>
          <Search placeholder="Tìm Kiếm Bạn Bè" onSearch={onSearch} />
          <div className="listUserInGroup">{renderListUsersInGroup()}</div>
        </section>
      </aside>
    </>
  );
};

export default ManagePeopleInGroup;
