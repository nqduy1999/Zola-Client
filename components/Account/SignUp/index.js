import React, { useState } from 'react';
import { classPrefixor } from 'utils/classPrefixor';
import { Button, Form, Input, Tabs } from 'antd';
import * as Validator from 'utils/validatorFormat';
import { PhoneFilled, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { sendOtp } from 'actions/accountAction';
import ConfirmOtpSignUp from '../ConfirmOtpSignUp';
const prefix = 'sign-up';
const c = classPrefixor(prefix);

const SignUp = () => {
  const dispatch = useDispatch();
  const { TabPane } = Tabs;
  const [otpSent, setOtpSent] = useState(false);
  const onSendOtp = value => {
    if (value.email) {
      const apiSendOtp = `active/send?email=${value.email}`;
      // dispatch(sendOtp(apiSendOtp)).then(res => {
      //   if (res.error) {
      //     toast.error(res.data[0].msg, {
      //       position: 'top-right',
      //       autoClose: 3000
      //     });
      //   } else {
      //     toast.success('Xác nhận thành công', {
      //       position: 'top-right',
      //       autoClose: 3000
      //     });
      //     setOtpSent(true);
      //   }
      // });
      console.log(apiSendOtp);
      setOtpSent(true);
    } else if (value.phone) {
      const apiSendOtp = `active/send?phone=${value.phone}`;
      dispatch(sendOtp(apiSendOtp)).then(res => {
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
                      {' '}
                      các điều khoản sử dụng của Zola
                    </a>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Tiếp tục
                    </Button>
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
                    Bằng cách bấm vào nút đăng ký, bạn đã đồng ý với
                    <a href="https://zalo.me/zalo/dieukhoan/">
                      {' '}
                      các điều khoản sử dụng của Zola
                    </a>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Tiếp tục
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>
          ) : (
            <ConfirmOtpSignUp />
          )}
        </div>
      </div>
    </div>
  );
};
export default SignUp;
