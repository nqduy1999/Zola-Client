import React from 'react';
import { Modal, Button, Form, Select } from 'antd';
import Avatar from 'react-avatar';
import { useSelector } from 'react-redux';

const prefix = 'modalAddFriendToGroup';
const { Option } = Select;

const ModalAddFriendToGroup = ({ ...props }) => {
  const { showModalAddFriendToGroup, handleCloseModalRoot } = props;
  const [form] = Form.useForm();
  const { listFriendContact } = useSelector(state => state.FriendReducer);

  const onFinish = values => {
    console.log(values);
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
    <>
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
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    </>
  );
};

export default ModalAddFriendToGroup;
