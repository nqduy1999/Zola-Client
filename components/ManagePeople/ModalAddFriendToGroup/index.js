// React Libary
import React, { useContext, useState } from 'react';
import { Modal, Button, Form, Checkbox } from 'antd';
import _ from 'lodash';
import Avatar from 'react-avatar';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Common
import { InfoRoomContext } from 'components/common/context/InfoRoomContext';
import { addUserToGroupAction } from 'actions/roomsAction';

const prefix = 'modalAddFriendToGroup';

const ModalAddFriendToGroup = ({ ...props }) => {
  const { showModalAddFriendToGroup, handleCloseModalRoot } = props;

  // antd hook
  const [form] = Form.useForm();

  // React Hook
  const [valueFriendAfterChecked, setValueFriendAfterChecked] = useState([]);

  //Redux Hook
  const dispatch = useDispatch();
  const { listFriendContact, listFriendPhoneBook } = useSelector(
    state => state.FriendReducer
  );

  // Context
  const { infoRoom } = useContext(InfoRoomContext);

  const listAllFriend = [...listFriendContact, ...listFriendPhoneBook];

  // lấy phần tử khác nhau giữa 2 mảng
  const listFriendCanKnow = _.differenceBy(
    listAllFriend,
    infoRoom?.users,
    'id'
  );

  // Xóa user nếu trùng id;
  const listFriendCanKnowClearDuplicate = _.uniqBy(listFriendCanKnow, 'id');

  const onFinish = () => {
    const list_user_id = [...valueFriendAfterChecked];
    dispatch(addUserToGroupAction(infoRoom?._id, list_user_id));
    handleCloseModalRoot(false);
  };

  const renderInfoFriend = friendInfo => {
    const checkAvatarFriend =
      friendInfo.avatar === null || friendInfo.avatar === '';
    return (
      <>
        <span className="friend--info">
          {checkAvatarFriend ? (
            <Avatar
              size="50px"
              className="avatar-create-group"
              name={friendInfo.name}
              style={{ fonSize: '25px' }}
            />
          ) : (
            <img src={friendInfo.avatar} alt="avatar" />
          )}
          <span>{friendInfo.name}</span>
        </span>
      </>
    );
  };

  const handleChangeCheckBox = valueCheckBox => {
    setValueFriendAfterChecked(valueCheckBox);
  };

  const renderCheckBox = () => {
    return listFriendCanKnowClearDuplicate?.map(friend => {
      return (
        <>
          <Checkbox value={friend.id} key={friend.id}>
            {renderInfoFriend(friend)}
          </Checkbox>
        </>
      );
    });
  };

  return (
    <>
      <Modal
        title="Thêm Bạn Vào Nhóm"
        visible={showModalAddFriendToGroup}
        onCancel={() => handleCloseModalRoot(false)}
        footer={false}
        className={prefix}
      >
        <Form
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          <span>Có thể bạn quen biết</span>
          <Form.Item>
            <Checkbox.Group onChange={handleChangeCheckBox}>
              {renderCheckBox()}
            </Checkbox.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Thêm vào nhóm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddFriendToGroup;
