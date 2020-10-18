import React from 'react';
import { classPrefixor } from 'utils/classPrefixor';
// import { useDispatch } from 'react-redux';
import { Button, Input } from 'antd';
const prefix = 'sign-up';
const c = classPrefixor(prefix);

const ConfirmOtpSignUp = () => {
  //   const dispatch = useDispatch();
  return (
    <div>
      <div className="wrapper_signup">
        <div className={c`header`}></div>
        <div className={c`form-signup`}>
          <div className="box-au">
            <p>Mã kích hoạt đã được gửi đến số điện thoại:</p>
            <p>
              <span className="number-phone">+84837954779</span>
            </p>
            <div className="line-form custom_code_input_container">
              <Input
                autoComplete="off"
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Nhập mã kích hoạt"
              />
            </div>
            <p className="textAlign-center">
              <Button href="#!" className="link-resend ">
                Nhận lại mã kích hoạt
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmOtpSignUp;
