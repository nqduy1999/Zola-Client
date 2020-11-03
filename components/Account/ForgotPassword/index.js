import React, { useState } from 'react';
import { classPrefixor } from 'utils/classPrefixor';
import { Button, Form, Input, Tabs } from 'antd';
import * as Validator from 'utils/validatorFormat';
import { PhoneFilled, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtpForgot } from 'actions/accountAction';
import { toast } from 'react-toastify';
import useChangeMeta from 'components/common/hook/useChangeMeta';
import { Link } from 'core/routes';
import { urlHelper } from 'utils';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import ConfirmOtpForgot from '../ConfirmOtpForgot';
const prefix = 'sign-up';
const c = classPrefixor(prefix);
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.accountData);
  const { TabPane } = Tabs;
  useChangeMeta('Quên mật khẩu');
  const [otpSent, setOtpSent] = useState(false);
  const [valueSent, setValueSent] = useState(null);
  const onSendOtpForgotPassword = value => {
    if (value.email) {
      const apiSendOtp = `email=${value.email}`;
      setValueSent(value);
      dispatch(sendOtpForgot(apiSendOtp)).then(res => {
        console.log(res);
        if (res.error) {
          toast.error(res.message, {
            position: 'top-right',
            autoClose: 3000
          });
        } else {
          toast.success('Gửi mã otp thành công', {
            position: 'top-right',
            autoClose: 3000
          });
          setOtpSent(true);
        }
      });
    } else if (value.phone) {
      const apiSendOtp = `phone=${value.phone}`;
      setValueSent(value);
      dispatch(sendOtpForgot(apiSendOtp)).then(res => {
        if (res.error) {
          toast.error(res.data[0].msg, {
            position: 'top-right',
            autoClose: 3000
          });
        } else {
          toast.success('Gửi mã otp thành công', {
            position: 'top-right',
            autoClose: 3000
          });
          setOtpSent(true);
        }
      });
    }
  };
  return (
    <div>
      <div className="wrapper_signup">
        <div className={c`header`}></div>
        <div className={c`form-signup`}>
          {!otpSent ? (
            <Tabs>
              <TabPane
                tab={
                  <span>
                    <PhoneOutlined />
                    Số điện thoại
                  </span>
                }
                key="1"
              >
                <Form
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onSendOtpForgotPassword}
                >
                  <Form.Item
                    name="phone"
                    rules={[
                      Validator.phoneNumber(
                        'Phone',
                        'Số điện thoại không đúng định dạng'
                      ),
                      Validator.required('Phone', 'Không được bỏ trống')
                    ]}
                  >
                    <Input
                      placeholder="Nhập số điện thoại"
                      prefix={<PhoneFilled />}
                    />
                  </Form.Item>
                  <Form.Item
                    style={{
                      margin: '10px 0 15px',
                      color: '#888',
                      fontSize: '0.813em',
                      fontWeight: 'normal',
                      textAlign: 'center'
                    }}
                  >
                    Bằng cách bấm vào nút tiếp tục, chúng tôi sẽ gửi mã otp về
                    số điện thoại bạn đã đăng ký hoặc bạn đã nhớ ra mật khẩu ?{' '}
                    <Link {...urlHelper.getUrlHomePage().route}>
                      bấm vào đây để trở về đăng nhập
                    </Link>
                  </Form.Item>
                  <Form.Item>
                    {isLoading ? (
                      <Button type="primary" disabled>
                        <Spin indicator={antIcon} style={{ color: 'white' }} />
                      </Button>
                    ) : (
                      <Button type="primary" htmlType="submit">
                        Tiếp tục
                      </Button>
                    )}
                  </Form.Item>
                </Form>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <MailOutlined />
                    Email
                  </span>
                }
                key="2"
              >
                <Form
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onSendOtpForgotPassword}
                >
                  <Form.Item
                    name="email"
                    rules={[Validator.required('Email', 'Không được bỏ trống')]}
                  >
                    <Input
                      placeholder="Nhập Email "
                      prefix={<MailOutlined />}
                    />
                  </Form.Item>
                  <Form.Item
                    style={{
                      margin: '10px 0 15px',
                      color: '#888',
                      fontSize: '0.813em',
                      fontWeight: 'normal',
                      textAlign: 'center'
                    }}
                  >
                    Bằng cách bấm vào nút tiếp tục, chúng tôi sẽ gửi mã otp về
                    email bạn đã đăng ký hoặc bạn đã nhớ ra mật khẩu ?{' '}
                    <Link {...urlHelper.getUrlHomePage().route}>
                      bấm vào đây để trở về đăng nhập
                    </Link>
                  </Form.Item>
                  <Form.Item>
                    {isLoading ? (
                      <Button type="primary" disabled>
                        <Spin indicator={antIcon} style={{ color: 'white' }} />
                      </Button>
                    ) : (
                      <Button type="primary" htmlType="submit">
                        Tiếp tục
                      </Button>
                    )}
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>
          ) : (
            <ConfirmOtpForgot valueSent={valueSent} />
          )}
          <div className="login-or">
            <Link {...urlHelper.getUrlHomePage().route}>
              <div>
                <i className="fa fa-angle-double-left"></i> Quay lại
              </div>
            </Link>
            <div className="box-gap"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
