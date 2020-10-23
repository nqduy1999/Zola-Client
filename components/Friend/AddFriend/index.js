import { Button, Input, Form } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { classPrefixor } from 'utils/classPrefixor';
import SuggestFriend from '../SuggestFriend';
import { searchFriendAction } from 'actions/friendAction';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const prefix = 'add-friend';
const c = classPrefixor(prefix);
const AddFriend = props => {
  const [statusSearch, setStatusSearch] = useState(false);
  const [suggestFriend, setSuggestFriend] = useState(null);
  const handleChangeSearch = e => {
    if (e.target.value.length > 0) {
      dispatch(searchFriendAction(e.target.value)).then(res => {
        if (res.length > 0) {
          setSuggestFriend(res);
          setStatusSearch(true);
        } else {
          setSuggestFriend(null);
          setStatusSearch(false);
        }
      });
    } else {
      setSuggestFriend(null);
      setStatusSearch(false);
    }
  };
  const dispatch = useDispatch();
  const { visible, setVisible } = props;
  const cancelAddFriend = () => {
    setVisible(false);
    setSuggestFriend(null);
    setStatusSearch(false);
  };
  return (
    <Modal
      title="Thêm bạn"
      visible={visible}
      onCancel={cancelAddFriend}
      footer={
        statusSearch
          ? [
              <Button
                key="submit"
                form="searchUser"
                style={{
                  border: 'none',
                  color: '#0068ff',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
              >
                Tìm kiếm
              </Button>
            ]
          : null
      }
      style={{
        width: '150px'
      }}
      className={c`main`}
    >
      <Form {...layout} name="searchUser" initialValues={{ remember: true }}>
        <Form.Item name="phone">
          <Input
            placeholder="Nhập vào email hoặc số điện thoại"
            onChange={handleChangeSearch}
          />
        </Form.Item>
        {statusSearch ? (
          <Form.Item>
            <div className="ReactVirtualized__Grid__innerScrollContainer">
              <div className="headerFriendRequest">
                <div className="contentFriendRequest">
                  <div>Có thể bạn đang tìm</div>
                </div>
              </div>
              {suggestFriend?.map((value, key) => {
                return <SuggestFriend key={key} suggestF={value} />;
              })}
            </div>
          </Form.Item>
        ) : (
          ''
        )}
      </Form>
    </Modal>
  );
};
export default AddFriend;
AddFriend.propTypes = {
  children: PropTypes.objectOf(PropTypes.any),
  visible: PropTypes.any,
  setVisible: PropTypes.any
};
AddFriend.defaultProps = {
  children: {},
  visible: {},
  setVisible: {}
};
