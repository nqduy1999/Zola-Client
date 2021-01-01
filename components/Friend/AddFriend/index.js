import { Input, Form, Collapse } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { classPrefixor } from 'utils/classPrefixor';
import SuggestFriend from '../SuggestFriend';
import {
  fetchFriendsContactAction,
  getUserSentRequestAction,
  searchFriendAction,
  fetchFriendsRequestAction
} from 'actions/friendAction';
import { InfoRoomContext } from 'components/common/context/InfoRoomContext';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const prefix = 'add-friend';
const c = classPrefixor(prefix);
const AddFriend = () => {
  const { visibleAddFriend, setVisibleAddFriend } = useContext(InfoRoomContext);
  const [form] = Form.useForm();
  const [statusSearch, setStatusSearch] = useState(false);
  const [suggestFriend, setSuggestFriend] = useState(null);
  const { Panel } = Collapse;
  const { userProfile } = useSelector(state => state.userData);
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
  const cancelAddFriend = () => {
    setVisibleAddFriend(false);
    setSuggestFriend(null);
    setStatusSearch(false);
    form.resetFields();
  };
  useEffect(() => {
    dispatch(getUserSentRequestAction());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchFriendsContactAction(userProfile?.id));
  }, [dispatch, userProfile?.id]);
  useEffect(() => {
    dispatch(fetchFriendsRequestAction());
  }, [dispatch]);
  return (
    <Modal
      title="Thêm bạn"
      visible={visibleAddFriend}
      onCancel={cancelAddFriend}
      footer={null}
      style={{
        width: '150px'
      }}
      className={c`main`}
    >
      <Form
        {...layout}
        name="searchUser"
        initialValues={{ remember: true }}
        form={form}
      >
        <Form.Item name="phone">
          <Input
            placeholder="Nhập vào email hoặc số điện thoại"
            onChange={handleChangeSearch}
          />
        </Form.Item>
        {statusSearch ? (
          <Form.Item>
            <Collapse
              defaultActiveKey={['1']}
              bordered={false}
              expandIconPosition="right"
            >
              <Panel
                header="Có thể bạn đang tìm"
                key="1"
                style={{ backgroundColor: 'white' }}
              >
                <div className="scrollable-container">
                  <div>
                    {suggestFriend?.map((value, key) => {
                      return <SuggestFriend key={key} suggestF={value} />;
                    })}
                  </div>
                </div>
              </Panel>
            </Collapse>
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
  children: PropTypes.objectOf(PropTypes.any)
};
AddFriend.defaultProps = {
  children: {}
};
