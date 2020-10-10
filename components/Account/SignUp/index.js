import React, { useState } from 'react';
import { classPrefixor } from 'utils/classPrefixor';
import { Button, Form, Input } from 'antd';
import { PhoneFilled, MailOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp } from 'actions/accountAction';
const prefix = 'sign-up';
const c = classPrefixor(prefix);

const SignUp = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.accountData);
  // const onHandleChangeApi = useCallback(
  //   value => {
  //     switch (value) {
  //       case 'phone':
  //         setApiDefault(`active/send?phone=${values?.phone}`);
  //         break;
  //       case 'email':
  //         setApiDefault(`active/send?email=${values?.email}`);
  //         break;
  //       default:
  //         break;
  //     }
  //   },
  //   [values?.email, values?.phone]
  // );
  const [chooseOpt, setOpt] = useState(true);
  const [form] = Form.useForm();
  console.log(isLoading);
  const handleSendOtp = () => {
    console.log(apiDefault);
    dispatch(sendOtp(apiDefault)).then(res => console.log(res));
  };
  const onChangeEmail = e => {
    console.log(e.target.value);
    onHandleChangeApi('email');
    setValue({
      email: e.target.value
    });
  };
  // const onChangePhoneNumber = () =>{
  //   onHandleChangeApi('phone');
  // }
  return (
    <div>
      <div className="wrapper_signup">
        <div className={c`header`}></div>
        <div className={c`form-signup`}>
          <Form
            form={form}
            name="inputPhoneNumber"
            onFinish={handleSendOtp} // =onSubmit
            layout="vertical"
          >
            {chooseOpt ? (
              <Form.Item>
                <Input
                  placeholder="Nhập vào số điện thoại của bạn"
                  prefix={<PhoneFilled />}
                  value={values ? values.phone : ''}
                  name="phone"
                />
              </Form.Item>
            ) : (
              <Form.Item>
                <Input
                  name="email"
                  placeholder="Nhập vào email của bạn"
                  prefix={<MailOutlined name="email" />}
                  value={values ? values.email : ''}
                  onChange={onChangeEmail}
                />
              </Form.Item>
            )}
            <Form.Item>
              {chooseOpt ? (
                <a
                  onClick={() => {
                    setOpt(false);
                  }}
                >
                  Hoặc bấm vào đây để dùng Email đăng ký
                </a>
              ) : (
                <a
                  onClick={() => {
                    setOpt(true);
                  }}
                >
                  Hoặc bấm vào đây để dùng Số điện thoại đăng ký
                </a>
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Send OTP
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
