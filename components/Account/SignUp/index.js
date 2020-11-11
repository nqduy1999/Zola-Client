import React, { useState } from 'react';
import { classPrefixor } from 'utils/classPrefixor';
import { Button, Form, Input, Tabs } from 'antd';
import * as Validator from 'utils/validatorFormat';
import { PhoneFilled, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp } from 'actions/accountAction';
import ConfirmOtpSignUp from '../ConfirmOtpSignUp';
import { toast } from 'react-toastify';
import useChangeMeta from 'components/common/hook/useChangeMeta';
import { Link } from 'core/routes';
import { urlHelper } from 'utils';
const prefix = 'sign-up';
const c = classPrefixor(prefix);
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;
const SignUp = () => {
  const { isLoading } = useSelector(state => state.accountData);
  const dispatch = useDispatch();
  const { TabPane } = Tabs;
  useChangeMeta('Đăng ký');
  const [otpSent, setOtpSent] = useState(false);
  const [valueSent, setValueSent] = useState(null);
  const onSendOtp = value => {
    if (value.email) {
      const apiSendOtp = `active/send?email=${value.email}`;
      setValueSent(value);
      dispatch(sendOtp(apiSendOtp)).then(res => {
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
    } else if (value.phone) {
      const apiSendOtp = `active/send?phone=${value.phone}`;
      setValueSent(value);
      dispatch(sendOtp(apiSendOtp)).then(res => {
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
                  onFinish={onSendOtp}
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
                    Bằng cách bấm vào nút đăng ký, bạn đã đồng ý với
                    <a href="https://zalo.me/zalo/dieukhoan/">
                      các điều khoản sử dụng của Zola
                    </a>
                  </Form.Item>
                  <Form.Item>
                    {isLoading ? (
                      <Button type="primary">
                        <Spin indicator={antIcon} style={{ color: 'white' }} />
                      </Button>
                    ) : (
                      <Button type="primary" htmlType="submit">
                        Nhận mã kích hoạt
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
                  onFinish={onSendOtp}
                >
                  <Form.Item
                    name="email"
                    rules={[
                      Validator.emailFormat(
                        'Email',
                        'Email không đúng định dạng'
                      ),
                      Validator.required('Email', 'Không được bỏ trống')
                    ]}
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
                    Bằng cách bấm vào nút đăng ký, bạn đã đồng ý với
                    <a href="https://zalo.me/zalo/dieukhoan/">
                      {' '}
                      các điều khoản sử dụng của Zola
                    </a>
                  </Form.Item>
                  <Form.Item>
                    {isLoading ? (
                      <Button type="primary">
                        <Spin indicator={antIcon} style={{ color: 'white' }} />
                      </Button>
                    ) : (
                      <Button type="primary" htmlType="submit">
                        Nhận mã kích hoạt
                      </Button>
                    )}
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>
          ) : (
            <ConfirmOtpSignUp valueSent={valueSent} />
          )}
          <p className="action-more">
            Bạn đã có tài khoản ?
            <Link {...urlHelper.getUrlSignInPage().route}>Đăng nhập ngay!</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
