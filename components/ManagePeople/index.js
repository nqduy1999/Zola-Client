import React, { useContext } from 'react';
import { Input } from 'antd';

import { LeftOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { classPrefixor } from 'utils/classPrefixor';
import { ManagePeopleGroupContext } from 'components/common/context/ManagePeopleGroupContext';

const prefix = 'manage__people';
const c = classPrefixor(prefix);
const { Search } = Input;

const ManagePeopleInGroup = () => {
  const { setClickPeopleIcon } = useContext(ManagePeopleGroupContext);

  const onSearch = value => {
    console.log(value);
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
          <div className="addMemberInGroup">
            <UsergroupAddOutlined />
            <span>Thêm Thành Viên</span>
          </div>
        </section>
        <section className={c`content--middle`}>
          <Search placeholder="Tìm Kiếm Bạn Bè" onSearch={onSearch} />
        </section>
      </aside>
    </>
  );
};

export default ManagePeopleInGroup;
