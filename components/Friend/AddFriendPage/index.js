import React, { useContext } from 'react';
import { classPrefixor } from 'utils/classPrefixor';
import carousel1 from 'assets/images/addFriend.png';
import useChangeMeta from 'components/common/hook/useChangeMeta';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { InfoRoomContext } from 'components/common/context/InfoRoomContext';

const prefix = 'homePage';
const c = classPrefixor(prefix);

const AddFriendPage = () => {
  const { setVisibleAddFriend } = useContext(InfoRoomContext);
  useChangeMeta('Trang Chủ');
  return (
    <div className={c`main-container`}>
      <div
        style={{
          width: '475px',
          textAlign: 'center',
          color: 'rgb(34, 34, 34)'
        }}
        className="title-header"
      ></div>
      <div className="clear-float"></div>
      <div className="content"></div>
      <div className="img-home">
        <div>
          <img
            src={carousel1}
            className="img-carousel"
            style={{ marginLeft: '18%' }}
          />
          <div className="content" style={{ paddingBottom: '25px' }}>
            <span>Bạn chưa có lời mời kết bạn</span>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ marginLeft: '40%' }}
            onClick={() => setVisibleAddFriend(true)}
          >
            Thêm Bạn
          </Button>
        </div>
      </div>
    </div>
  );
};
export default AddFriendPage;
