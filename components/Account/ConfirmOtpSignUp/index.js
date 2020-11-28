import React from 'react';
import { classPrefixor } from 'utils/classPrefixor';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import { activeAccount, sendOtp, SignUp } from 'actions/accountAction';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import * as Validator from 'utils/validatorFormat';

const prefix = 'confirm-otp-sign-up';
const c = classPrefixor(prefix);

const ConfirmOtpSignUp = props => {
  const { NAME_RGX } = Validator.RGX;
  const { valueSent } = props;
  const { push } = useRouter();
  const dispatch = useDispatch();
  const SendOtpAgain = () => {
    if (valueSent && valueSent.email) {
      const apiSendOtp = `active/send?email=${valueSent.email}`;
      dispatch(sendOtp(apiSendOtp)).then(res => {
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
      const apiSendOtp = `active/send?phone=${valueSent.phone}`;
      dispatch(sendOtp(apiSendOtp)).then(res => {
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
      dispatch(activeAccount(valueActive)).then(res => {
        if (res.error) {
          toast.error(res.message, {
            position: 'top-right',
            autoClose: 3000
          });
        } else {
          const valueSignUp = {
            name: value.name,
            password: value.password,
            passwordConfirm: value.passwordConfirm,
            email: valueSent.email
          };
          dispatch(SignUp(push, valueSignUp)).then(res => {
            if (res.error) {
              toast.error(res.message, {
                position: 'top-right',
                autoClose: 3000
              });
            } else {
              toast.success('Đăng ký thành công', {
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
      dispatch(activeAccount(valueActive)).then(res => {
        if (res.error) {
          toast.error(res.message, {
            position: 'top-right',
            autoClose: 3000
          });
        } else {
          const valueSignUp = {
            name: value.name,
            password: value.password,
            passwordConfirm: value.passwordConfirm,
            phone: valueSent.phone
          };
          dispatch(SignUp(push, valueSignUp)).then(res => {
            if (res.error) {
              toast.error(res.message, {
                position: 'top-right',
                autoClose: 3000
              });
            } else {
              toast.success('Đăng ký thành công', {
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
    <div className="wrapper_signup">
      <Form className={c`form-signup`} onFinish={submit}>
        <div className="box-au">
          <p>
            Mã kích hoạt đã được gửi đến {''}
            {valueSent?.email ? 'email' : 'số điện thoại'}:
          </p>
          <p>
            <span className="number-phone">
              {valueSent?.email ? valueSent?.email : valueSent?.phone}
            </span>
          </p>
          <Form.Item
            name="code"
            rules={[{ required: true, message: 'Mã otp không được bỏ trống' }]}
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
        <Form.Item
          name="name"
          rules={[
            { required: true, message: 'Vui lòng nhập tên!' },
            {
              max: 32,
              min: 6,
              message: 'Tên có ít nhất 6 ký tự và tối đa 32 ký tự'
            },
            {
              pattern: NAME_RGX,
              message: 'Không chứa ký tự đặc biệt'
            }
          ]}
        >
          <div className="line-form">
            <Input
              placeholder="Nhập tên bạn muốn hiển thị"
              style={{ border: 'none', borderBottom: '1px solid #ecedf0' }}
            />
          </div>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            Validator.password('name', 'Password không đúng định dạng'),
            Validator.required('name', 'Không được bỏ trống')
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
          name="passwordConfirm"
          rules={[
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (value) {
                  if (getFieldValue('password') === value) {
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
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
export default ConfirmOtpSignUp;
ConfirmOtpSignUp.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  valueSent: PropTypes.any
};

ConfirmOtpSignUp.defaultProps = {
  children: {}
};
