import React, { useState } from 'react';
import { classPrefixor } from 'utils/classPrefixor';
import { Form, Input, Button, Tabs } from 'antd';
import useChangeMeta from 'components/common/hook/useChangeMeta';
// import logo from 'assets/images/zola-logo.png';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import * as Validator from 'utils/validatorFormat';
import { SignInAccount } from 'actions/accountAction';
import { toast } from 'react-toastify';
import {
  MailOutlined,
  PhoneOutlined,
  PhoneFilled,
  LockFilled
} from '@ant-design/icons';
import { urlHelper } from 'utils';
import { Link } from 'core/routes';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

// Hook

const prefix = 'sign-in';
const c = classPrefixor(prefix);
const { TabPane } = Tabs;
const SignIn = () => {
  const [type, setChangeType] = useState('phone');
  useChangeMeta('Đăng nhập');
  const { push } = useRouter();
  const dispatch = useDispatch();
  const onSignIn = data => {
    console.log(data);
    dispatch(SignInAccount(data, push)).then(res => {
      console.log(res);
      const { error } = res;
      if (!error) {
        toast.success('🦄 Đăng nhập thành công!', {
          position: 'top-right',
          autoClose: 3000
        });
      } else {
        toast.error(res?.data[0]?.msg, {
          position: 'top-right',
          autoClose: 3000
        });
      }
      localStorage.setItem('type', JSON.stringify(type));
    });
  };
  return (
    <div className="wrapper-page">
      <div className="wrapper-page">
        <div className={c`main`}>
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  <PhoneOutlined />
                  Số điện thoại
                </span>
              }
              key="1"
              onFinish={() => {
                setChangeType('phone');
              }}
            >
              <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onSignIn}
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
                  name="password"
                  rules={[
                    { required: true, message: 'Vui lòng nhập mật khẩu!' }
                  ]}
                >
                  <Input.Password
                    prefix={<LockFilled />}
                    placeholder="Nhập mật khẩu"
                  />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>
              <Link {...urlHelper.getUrlSignUp().route}>
                Bạn chưa có tài khoản? Đăng ký ngay!
              </Link>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <MailOutlined />
                  Email
                </span>
              }
              key="2"
              onFinish={() => {
                setChangeType('email');
              }}
            >
              <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onSignIn}
              >
                <Form.Item
                  name="email"
                  rules={[Validator.required('Email', 'Không được bỏ trống')]}
                >
                  <Input placeholder="Nhập Email " prefix={<MailOutlined />} />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: 'Vui lòng nhập mật khẩu!' }
                  ]}
                >
                  <Input.Password
                    prefix={<LockFilled />}
                    placeholder="Nhập mật khẩu"
                  />
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    Đăng nhập
                  </Button>
                </Form.Item>
                <Link {...urlHelper.getUrlSignUp().route}>
                  Bạn chưa có tài khoản? Đăng ký ngay!
                </Link>
              </Form>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
