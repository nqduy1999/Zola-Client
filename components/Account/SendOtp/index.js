import { Button, Input, Form, Radio } from 'antd';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import FormItem from 'antd/lib/form/FormItem';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp } from 'actions/accountAction';
import { toast } from 'react-toastify';
import { getProfileUser, updateOtpUser } from 'actions/userAction';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const SendOtpComponent = props => {
  const { cancelModal, visible, typeOfsendOtp } = props;
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState({});
  const { auth_token, isLoading } = useSelector(state => state.accountData);
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px'
  };
  const dispatch = useDispatch();
  const updateForOtp = value => {
    if (typeOfsendOtp) {
      const valueUpdate = {
        code: value.code,
        email: otp.email
      };
      dispatch(updateOtpUser(valueUpdate)).then(res => {
        if (res.error) {
          toast.error(res.data[0].msg, {
            position: 'top-right',
            autoClose: 3000
          });
        } else {
          toast.success(res.message, {
            position: 'top-right',
            autoClose: 3000
          });
          dispatch(getProfileUser(auth_token));
          handleCancelModal();
        }
      });
    } else {
      const valueUpdate = {
        code: value.code,
        phone: otp.phone
      };
      dispatch(updateOtpUser(valueUpdate)).then(res => {
        if (res.error) {
          toast.error(res.data[0].msg, {
            position: 'top-right',
            autoClose: 3000
          });
        } else {
          toast.success(res.message, {
            position: 'top-right',
            autoClose: 3000
          });
          dispatch(getProfileUser(auth_token));
          handleCancelModal();
        }
      });
    }
  };
  const sendOtpForConfirm = value => {
    if (typeOfsendOtp) {
      const apiSendOtp = `active/send?email=${value.email}`;
      dispatch(sendOtp(apiSendOtp)).then(res => {
        console.log(res);
        if (res.error) {
          toast.error(res.data[0].msg, {
            position: 'top-right',
            autoClose: 3000
          });
        } else {
          toast.success('Xác nhận thành công', {
            position: 'top-right',
            autoClose: 3000
          });
          setOtp(value);
          setOtpSent(true);
        }
      });
    } else {
      const apiSendOtp = `active/send?phone=${value.phone}`;
      dispatch(sendOtp(apiSendOtp)).then(res => {
        if (res.error) {
          toast.error(res.data[0].msg, {
            position: 'top-right',
            autoClose: 3000
          });
        } else {
          toast.success(res.message, {
            position: 'top-right',
            autoClose: 3000
          });
          setOtp(value);
          setOtpSent(true);
        }
      });
    }
  };
  const handleCancelModal = () => {
    cancelModal();
    setOtpSent(false);
  };
  return (
    <Modal
      title={
        typeOfsendOtp
          ? 'Xác nhận email của bạn'
          : 'Xác nhận số điện thoại của bạn'
      }
      visible={visible}
      className="otpSend"
      onCancel={handleCancelModal}
      footer={false}
      style={{
        width: '150px'
      }}
    >
      {otpSent ? (
        <Form
          name="update"
          initialValues={{ remember: true }}
          onFinish={updateForOtp}
        >
          <Form.Item
            label="Mã xác nhận"
            name="code"
            rules={[
              { required: true, message: 'Mã xác nhận không được để trống!' }
            ]}
          >
            <Input placeholder="Nhập mã xác nhận " />
          </Form.Item>
          <FormItem>
            {isLoading ? (
              <Button
                style={{
                  background: '#0068ff',
                  fontSize: '12px',
                  color: 'white',
                  marginLeft: '40%'
                }}
              >
                <Spin indicator={antIcon} style={{ color: 'white' }} />
              </Button>
            ) : (
              <Button
                htmlType="submit"
                style={{
                  background: '#0068ff',
                  fontSize: '12px',
                  color: 'white',
                  marginLeft: '40%'
                }}
              >
                Cập nhật
              </Button>
            )}
          </FormItem>
        </Form>
      ) : (
        <Form
          id="sendOtp"
          name="update"
          initialValues={{ remember: true }}
          onFinish={sendOtpForConfirm}
        >
          {typeOfsendOtp && typeOfsendOtp == true ? (
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Email không được để trống!' }
              ]}
            >
              <Input placeholder="Nhập email " />
            </Form.Item>
          ) : (
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Số điện thoại không được để trống!'
                }
              ]}
            >
              <Input placeholder="Nhập số điện thoại " />
            </Form.Item>
          )}
          <Form.Item label={`Xác nhận `}>
            <Radio.Group value={1}>
              <Radio style={radioStyle} value={1}>
                {typeOfsendOtp && typeOfsendOtp == true
                  ? 'Gửi Email cho tôi'
                  : 'Gửi tin nhắn cho tôi'}
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            {typeOfsendOtp && typeOfsendOtp == true ? (
              <p>
                Khi xác nhận email, bạn có thể đặt lại mật khẩu dễ dàng và nhận
                thông báo qua email. Nhờ đó, chúng tôi cũng có thể gợi ý bạn bè,
                cung cấp cũng như cải thiện quảng cáo cho bạn và những người
                khác.
              </p>
            ) : (
              <p>
                Khi xác nhận số di động, bạn có thể đặt lại mật khẩu dễ dàng và
                nhận thông báo qua SMS. Nhờ đó, chúng tôi cũng có thể gợi ý bạn
                bè, cung cấp cũng như cải thiện quảng cáo cho bạn và những người
                khác. Chỉ bạn mới nhìn thấy số di động của mình.
              </p>
            )}
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              style={{
                background: '#0068ff',
                fontSize: '12px',
                color: 'white',
                marginLeft: '40%'
              }}
            >
              Tiếp tục
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
export default SendOtpComponent;

SendOtpComponent.propTypes = {
  children: PropTypes.objectOf(PropTypes.any),
  userProfile: PropTypes.objectOf(PropTypes.any),
  visible: PropTypes.any,
  setVisible: PropTypes.objectOf(PropTypes.any),
  cancelModal: PropTypes.any,
  typeOfsendOtp: PropTypes.any
};
SendOtpComponent.defaultProps = {
  children: {},
  userProfile: {},
  setVisible: {},
  cancelModal: {}
};
