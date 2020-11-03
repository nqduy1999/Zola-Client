import React from 'react';
import { classPrefixor } from 'utils/classPrefixor';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {
  changePassword,
  sendOtpForgot,
  verifyForgotAccount
} from 'actions/accountAction';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import * as Validator from 'utils/validatorFormat';

const prefix = 'confirm-otp-sign-up';
const c = classPrefixor(prefix);
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ConfirmOtpForgot = props => {
  const { isLoading } = useSelector(state => state.accountData);
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
          const valueChange = {
            newPassword: value.newPassword,
            confirmNewPassword: value.confirmNewPassword
          };
          dispatch(changePassword(push, valueChange)).then(res => {
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
        phone: valueSent.phone
      };
      dispatch(verifyForgotAccount(valueActive)).then(res => {
        if (res.error) {
          toast.error(res.message, {
            position: 'top-right',
            autoClose: 3000
          });
        } else {
          const valueChange = {
            newPassword: value.newPassword,
            confirmNewPassword: value.confirmNewPassword
          };
          dispatch(changePassword(push, valueChange)).then(res => {
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
              {isLoading ? (
                <a className="link-resend ">
                  <Spin indicator={antIcon} />
                </a>
              ) : (
                <a className="link-resend " onClick={SendOtpAgain}>
                  Nhận lại mã kích hoạt
                </a>
              )}
            </p>
          </div>
          <Form.Item
            name="newPassword"
            rules={[
              Validator.password('Phone', 'Password không đúng định dạng'),
              Validator.required('Phone', 'Không được bỏ trống')
            ]}
          >
            <div className="line-form">
              <Input.Password
                placeholder="Nhập mật khẩu"
                style={{ border: 'none', borderBottom: '1px solid #ecedf0' }}
              />
            </div>
          </Form.Item>
          <Form.Item
            name="confirmNewPassword"
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
            <div className="line-form">
              <Input.Password
                placeholder="Nhập lại mật khẩu"
                style={{ border: 'none', borderBottom: '1px solid #ecedf0' }}
              />
            </div>
          </Form.Item>
          <Form.Item name="name">
            <div className="line-form">
              {isLoading ? (
                <Button type="primary">
                  <Spin indicator={antIcon} style={{ color: 'white' }} />
                </Button>
              ) : (
                <Button type="primary" htmlType="submit">
                  Xác nhận
                </Button>
              )}
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
