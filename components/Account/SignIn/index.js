import React from 'react';
import { classPrefixor } from 'utils/classPrefixor';
import { Form, Input, Button, Tabs } from 'antd';
import useChangeMeta from 'components/common/hook/useChangeMeta';
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
  useChangeMeta('Đăng nhập');
  const { push } = useRouter();
  const dispatch = useDispatch();
  const onSignIn = data => {
    dispatch(SignInAccount(data, push)).then(res => {
      const { error } = res;
      if (!error) {
        if (data.email) {
          const type = 'email';
          localStorage.setItem('type', JSON.stringify(type));
        } else {
          const type = 'phone';
          localStorage.setItem('type', JSON.stringify(type));
        }
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
                    Validator.password(
                      'Phone',
                      'Password không đúng định dạng'
                    ),
                    Validator.required('Password', 'Không được bỏ trống')
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
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onSignIn}
              >
                <Form.Item
                  name="email"
                  rules={[
                    Validator.emailFormat(
                      'Phone',
                      'Email không đúng định dạng'
                    ),
                    Validator.required('Email', 'Không được bỏ trống')
                  ]}
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
              </Form>
            </TabPane>
          </Tabs>
          <p className="action-more">
            <Link {...urlHelper.getUrlForgot().route}>Quên mật khẩu?</Link>
          </p>
          <p className="action-more">
            Bạn chưa có tài khoản?{' '}
            <Link {...urlHelper.getUrlSignUp().route}>Đăng ký ngay!</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
