import React from 'react';
import { Modal, Select, Form, Input, Button } from 'antd';
import { classPrefixor } from 'utils/classPrefixor';
import { useDispatch, useSelector } from 'react-redux';
import { createGroupChatAction } from 'actions/groupAction';
import Avatar from 'react-avatar';

const prefix = 'addGroup';
const c = classPrefixor(prefix);
const { Option } = Select;

const AddGroup = ({ ...props }) => {
  const { showModalAddGroup, closeModalAddGroup } = props;

  const dispatch = useDispatch();
  const { listFriendContact } = useSelector(state => state.FriendReducer);

  const handleCancel = bool => {
    closeModalAddGroup(bool);
  };

  const onFinish = values => {
    dispatch(createGroupChatAction(values));
    closeModalAddGroup(false);
  };

  const renderOption = () => {
    return listFriendContact?.map(friend => {
      return (
        <Option label={friend.name} value={friend.id} key={friend.id}>
          <div className="select--info">
            {friend.avatar === null || friend.avatar === '' ? (
              <Avatar
                size="38px"
                className="avatar-create-group"
                name={friend.name}
              />
            ) : (
              <img src={friend.avatar} alt="avatar" />
            )}
            <span>{friend.name}</span>
          </div>
        </Option>
      );
    });
  };

  return (
    <div className={prefix}>
      <Modal
        visible={showModalAddGroup}
        title="Tạo Nhóm"
        onCancel={() => handleCancel(false)}
        footer={null}
      >
        <div className={c`content`}>
          <Form className="group-form" onFinish={onFinish}>
            <span className={c`content__title`}>Tên Nhóm</span>

            <Form.Item name="name">
              <Input placeholder="Nhập tên nhóm..." />
            </Form.Item>
            <span className={c`content__title`}>
              Mời thêm bạn vào trò chuyện
            </span>

            <Form.Item name="list_user_id">
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Tìm kiếm bằng tên"
                filterOption={(input, option) =>
                  option?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {renderOption()}
              </Select>
            </Form.Item>
            <Form.Item>
              <span className={c`content__tips`}>
                Bạn có thể tạo nhanh nhóm bằng cách điền danh sách số điện thoại
                của người tham gia vào đây.
              </span>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Tạo Nhóm
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default AddGroup;
