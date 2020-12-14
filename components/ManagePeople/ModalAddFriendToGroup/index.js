import React, { useContext, useState, useCallback } from 'react';
import { Modal, Button, Form, Checkbox } from 'antd';
import Avatar from 'react-avatar';
import { useSelector } from 'react-redux';
import { InfoRoomContext } from 'components/common/context/InfoRoomContext';

const prefix = 'modalAddFriendToGroup';

const ModalAddFriendToGroup = ({ ...props }) => {
  const { showModalAddFriendToGroup, handleCloseModalRoot } = props;
  const [valueFriendAfterChecked, setValueFriendAfterChecked] = useState([]);
  const [form] = Form.useForm();
  const { listFriendContact } = useSelector(state => state.FriendReducer);
  const { infoRoom } = useContext(InfoRoomContext);

  const onFinish = () => {
    const list_user_id = [...valueFriendAfterChecked];
    console.log(list_user_id);
  };

  const findUserInRoom = useCallback(() => {
    infoRoom?.users?.forEach(userInRoom => {
      listFriendContact?.forEach(friend => {
        if (userInRoom.id === friend.id) {
          return true;
        } else {
          return false;
        }
      });
    });
  }, [infoRoom?.users, listFriendContact]);

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
    return listFriendContact?.map(friend => {
      return (
        <Checkbox value={friend.id} key={friend.id} disabled={findUserInRoom}>
          {renderInfoFriend(friend)}
        </Checkbox>
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddFriendToGroup;
