// React Libary
import React, { useContext } from 'react';
import { Button } from 'antd';
import { LeftOutlined, UserOutlined } from '@ant-design/icons';

// Redux
import { useDispatch } from 'react-redux';
import { exitGroupChatAction } from 'actions/groupAction';

// Common
import { classPrefixor } from 'utils/classPrefixor';
import { ManagePeopleGroupContext } from 'components/common/context/ManagePeopleGroupContext';
import { InfoRoomContext } from 'components/common/context/InfoRoomContext';
import { filterUserExitedRoom } from 'components/common/function/lodash';

const prefix = 'info-conversation';
const c = classPrefixor(prefix);

const InfoConversation = () => {
  const dispatch = useDispatch();
  const { setClickSideBarIcon, setClickPeopleIcon } = useContext(
    ManagePeopleGroupContext
  );
  const { infoRoom } = useContext(InfoRoomContext);
  // Global
  const infoRoomClearUserExited = filterUserExitedRoom(infoRoom?.users);

  const handleManagePeoPleInGroup = () => {
    setClickSideBarIcon('unClickSideBarIcon');
    setClickPeopleIcon('clickPeopleIcon');
  };

  const handleExitGroup = () => {
    dispatch(exitGroupChatAction(infoRoom?._id));
  };

  return (
    <aside className={prefix}>
      <nav className={c`header`}>
        <span
          className="icon_out"
          onClick={() => setClickSideBarIcon('unClickSideBarIcon')}
        >
          <LeftOutlined />
        </span>
        <p className="title">THÔNG TIN HỘI THOẠI</p>
      </nav>
      <section className={c`content--top`}>
        <div
          className="memberInGroup"
          onClick={() => handleManagePeoPleInGroup()}
        >
          <UserOutlined />{' '}
          <span>{infoRoomClearUserExited.length} Thành Viên</span>
        </div>
      </section>
      <div className="exit-group" style={{ paddingLeft: '60px' }}>
        <Button
          type="primary"
          onClick={() => handleExitGroup()}
          style={{ borderRadius: '5px' }}
        >
          Rời Khỏi Nhóm
        </Button>
      </div>
    </aside>
  );
};

export default InfoConversation;
