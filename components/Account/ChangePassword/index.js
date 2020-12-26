import { Button, Input, Form } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import { toast } from 'react-toastify';
import * as Validator from 'utils/validatorFormat';
import { changePasswordUser } from 'actions/accountAction';
import PropTypes, { func } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ChangePasswordUser = props => {
  const { cancelPassword, visible, setVisible } = props;
  const { isLoading } = useSelector(state => state.accountData);
  const dispatch = useDispatch();
  const submitPassword = value => {
    dispatch(changePasswordUser(value)).then(res => {
      if (!res.error) {
        toast.success('🦄 Update Successful!', {
          position: 'top-right',
          autoClose: 3000
        });
        setVisible(false);
      }
    });
  };
  return (
    <Modal
      title="Cập nhật mật khẩu"
      className="modalUpdateUser"
      visible={visible}
      onCancel={cancelPassword}
      footer={null}
      style={{
        width: '150px'
      }}
    >
      <Form
        layout="vertical"
        id="updateUser"
        name="update"
        initialValues={{ remember: true }}
        onFinish={submitPassword}
      >
        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[
            Validator.password('Phone', 'Password không đúng định dạng'),
            Validator.required('Phone', 'Không được bỏ trống')
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Nhập lại mật khẩu "
          name="confirmNewPassword"
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (value) {
                  if (getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Mật khẩu không giống');
                }
                return Promise.reject('Không được bỏ trống');
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          {isLoading ? (
            <Button
              type="primary"
              style={{
                fontSize: '12px',
                fontWeight: '500',
                margin: '0px auto',
                display: 'block',
                padding: '0px 70px'
              }}
            >
              <Spin indicator={antIcon} style={{ color: 'white' }} />
            </Button>
          ) : (
            <Button
              type="primary"
              htmlType="submit"
              style={{
                fontSize: '12px',
                fontWeight: '500',
                margin: '0px auto',
                display: 'block'
              }}
            >
              Cập nhật mật khẩu
            </Button>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ChangePasswordUser;
ChangePasswordUser.propTypes = {
  children: PropTypes.objectOf(PropTypes.any),
  cancelPassword: func,
  userProfile: PropTypes.objectOf(PropTypes.any),
  visible: PropTypes.any,
  setVisible: PropTypes.func
};
ChangePasswordUser.defaultProps = {
  children: {},
  visible: {},
  setVisible: {},
  cancelPassword: {}
};
