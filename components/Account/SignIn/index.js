import React, { useState } from 'react';
import { classPrefixor } from 'utils/classPrefixor';
import { Form, Input, Button } from 'antd';
import useChangeMeta from 'components/common/hook/useChangeMeta';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import * as Validator from 'utils/validatorFormat';
import { SignInAccount } from 'actions/accountAction';
import { toast } from 'react-toastify';

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

const SignIn = () => {
  const [type, setChangeType] = useState('phone');
  useChangeMeta('Đăng nhập');
  const { push } = useRouter();
  const dispatch = useDispatch();
  const onSignIn = data => {
    dispatch(SignInAccount(data, push)).then(res => {
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
      <div className={c`main`}>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onSignIn}
        >
          {type == 'phone' ? (
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                Validator.phoneNumber(
                  'Phone',
                  'Số điện thoại không đúng định dạng'
                ),
                Validator.required('Phone', 'Không được bỏ trống')
              ]}
            >
              <Input />
            </Form.Item>
          ) : (
            <Form.Item
              label="Email"
              name="email"
              rules={[Validator.required('Email', 'Không được bỏ trống')]}
            >
              <Input />
            </Form.Item>
          )}

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              SignIn
            </Button>
          </Form.Item>
          {type == 'phone' ? (
            <Form.Item {...tailLayout}>
              <a
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setChangeType('email');
                }}
              >
                Login with Email
              </a>
            </Form.Item>
          ) : (
            <Form.Item {...tailLayout}>
              <a
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setChangeType('phone');
                }}
              >
                Login with Phone
              </a>
            </Form.Item>
          )}
        </Form>
      </div>
    </div>
  );
};
export default SignIn;
