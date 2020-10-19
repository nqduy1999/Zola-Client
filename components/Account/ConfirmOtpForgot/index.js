import React from 'react';
import { classPrefixor } from 'utils/classPrefixor';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import {
  changePassword,
  sendOtpForgot,
  verifyForgotAccount
} from 'actions/accountAction';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const prefix = 'confirm-otp-sign-up';
const c = classPrefixor(prefix);

const ConfirmOtpForgot = props => {
  const { valueSent } = props;
  const { push } = useRouter();
  const dispatch = useDispatch();
  const SendOtpAgain = () => {
    if (valueSent && valueSent.email) {
      const apiSendOtp = `email=${valueSent.email}`;
      dispatch(sendOtpForgot(apiSendOtp)).then(res => {
        if (res.error) {
          toast.error(res.data[0].msg, {
            position: 'top-right',
            autoClose: 3000
          });
        } else {
          toast.success('Gửi lại mã otp thành công', {
            position: 'top-right',
            autoClose: 3000
          });
        }
      });
    } else {
      const apiSendOtp = `phone=${valueSent.phone}`;
      dispatch(sendOtpForgot(apiSendOtp)).then(res => {
        if (res.error) {
          toast.error(res.data[0].msg, {
            position: 'top-right',
            autoClose: 3000
          });
        } else {
          toast.success('Gửi lại mã otp thành công', {
            position: 'top-right',
            autoClose: 3000
          });
        }
      });
    }
  };
  const submit = value => {
    if (valueSent && valueSent.email) {
      const valueActive = {
        code: value.code,
        email: valueSent.email
      };
      dispatch(verifyForgotAccount(valueActive)).then(res => {
        if (res.error) {
          toast.error(res.message, {
            position: 'top-right',
            autoClose: 3000
          });
        } else {
          const valueSignUp = {
            newPassword: value.password,
            confirmNewPassword: value.passwordConfirm
          };
          dispatch(changePassword(push, valueSignUp)).then(res => {
            if (res.error) {
              toast.error(res.message, {
                position: 'top-right',
                autoClose: 3000
              });
            } else {
              toast.success('Đổi mật khẩu thành công', {
                position: 'top-right',
                autoClose: 3000
              });
            }
          });
        }
      });
    } else {
      const valueActive = {
        code: value.code,
        email: valueSent.phone
      };
      dispatch(verifyForgotAccount(valueActive)).then(res => {
        if (res.error) {
          toast.error(res.message, {
            position: 'top-right',
            autoClose: 3000
          });
        } else {
          const valueSignUp = {
            newPassword: value.password,
            confirmNewPassword: value.passwordConfirm,
            phone: valueSent.phone
          };
          dispatch(changePassword(push, valueSignUp)).then(res => {
            if (res.error) {
              toast.error(res.message, {
                position: 'top-right',
                autoClose: 3000
              });
            } else {
              toast.success('Đổi mật khẩu thành công', {
                position: 'top-right',
                autoClose: 3000
              });
            }
          });
        }
      });
    }
  };
  return (
    <div>
      <div className="wrapper_signup">
        <Form className={c`form-signup`} onFinish={submit}>
          <div className="box-au">
            <p>
              Mã kích hoạt đã được gửi đến
              {valueSent?.email ? 'email' : 'số điện thoại'}:
            </p>
            <p>
              <span className="number-phone">
                {valueSent?.email ? valueSent?.email : valueSent?.phone}
              </span>
            </p>
            <Form.Item
              name="code"
              rules={[
                { required: true, message: 'Mã otp không được bỏ trống' }
              ]}
            >
              <div className="line-form custom_code_input_container">
                <Input placeholder="Nhập mã kích hoạt" />
              </div>
            </Form.Item>

            <p className="textAlign-center">
              <a className="link-resend " onClick={SendOtpAgain}>
                Nhận lại mã kích hoạt
              </a>
            </p>
          </div>
          <Form.Item name="password">
            <div className="line-form">
              <Input.Password
                placeholder="Nhập mật khẩu"
                style={{ border: 'none', borderBottom: '1px solid #ecedf0' }}
              />
            </div>
          </Form.Item>
          <Form.Item name="passwordConfirm">
            <div className="line-form">
              <Input.Password
                placeholder="Nhập lại mật khẩu"
                style={{ border: 'none', borderBottom: '1px solid #ecedf0' }}
              />
            </div>
          </Form.Item>
          <Form.Item name="name">
            <div className="line-form">
              <Button type="primary" htmlType="submit">
                Xác nhận
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default ConfirmOtpForgot;
ConfirmOtpForgot.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  valueSent: PropTypes.any
};

ConfirmOtpForgot.defaultProps = {
  children: {}
};
