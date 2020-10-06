// import React, { useState } from 'react';
// import { classPrefixor } from 'utils/classPrefixor';
// import { Button, Input, Radio, Steps, Form, Spin } from 'antd';
// import { LoadingOutlined } from '@ant-design/icons';
// import { SignUpAccount } from 'actions/accountAction';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';

// const { Step } = Steps;

// // Hook

// const prefix = 'sign-up';
// const c = classPrefixor(prefix);
// const radioStyle = {
//   display: 'block',
//   height: '30px',
//   lineHeight: '30px'
// };
// const SignUp = () => {
//   const [current, setCurrent] = useState(0);
//   const [percent, setPercent] = useState('');
//   const [chooseOpt, setChooseOption] = useState();
//   const [hideForm, setHideForm] = useState(false);
//   const [form] = Form.useForm();
//   const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
//   const dispatch = useDispatch();
//   const { error } = useSelector(state => state.accountData);
//   // const next = () => {
//   //   const currentNow = current + 1;
//   //   setCurrent(currentNow);
//   //   setPercent(0);
//   // };
//   // const chooseOption = e => {
//   //   setChooseOption(e.target.value);
//   //   setPercent(50);
//   //   setHideForm(true);
//   // };
//   // const prev = () => {
//   //   const currentNow = current - 1;
//   //   setCurrent(currentNow);
//   // };
//   const handleSubmitInfor = value => {
//     dispatch(SignUpAccount(value));
//     if (error && error.error == true) {
//       if (error.data.length == 1) {
//         console.log(error.data.msg);
//         toast.error(error.data.msg, {
//           autoClose: 3000
//         });
//       } else {
//         for (let i; i < error.data.length; i++) {
//           console.log(error.data[i].msg);
//           toast.error(error.data[i].msg, {
//             autoClose: 3000
//           });
//         }
//       }
//     } else {
//       toast.success(error?.data, {
//         autoClose: 3000
//       });
//     }
//     setPercent(0);
//   };
//   const sendOtp = () => {
//     console.log('Send Otp');
//   };
//   const CustomSpinner = () => <Spin indicator={antIcon} />;
//   return (
//     <div className="wrapper_signup">
//       <div className="form-signup">
//         <div className={c`header-signup`}></div>
//         <div className={c`step`}>
//           <Steps
//             current={current}
//             percent={percent}
//             type="navigation"
//             size="small"
//             className="site-navigation-steps"
//           >
//             <Step title="Thông tin đăng ký"></Step>
//             <Step title="Nhập mã Otp" />
//             <Step title="Đăng ký thành công" />
//           </Steps>
//         </div>
//         <div className={c`main`}>
//           {current === 0 ? (
//             <>
//               <Radio.Group onChange={chooseOption}>
//                 <Radio style={radioStyle} value={1}>
//                   Số điện thoại
//                 </Radio>
//                 <Radio style={radioStyle} value={2}>
//                   Email
//                 </Radio>
//               </Radio.Group>
//               {hideForm === true ? (
//                 <Form
//                   form={form}
//                   name="updateData"
//                   onFinish={handleSubmitInfor} // =onSubmit
//                   layout="vertical"
//                 >
//                   {chooseOpt === 1 ? (
//                     <Form.Item
//                       label="Phone"
//                       name="phone"
//                       rules={[
//                         {
//                           required: true,
//                           message: 'Vui lòng không bỏ trống số điện thoại'
//                         }
//                       ]}
//                     >
//                       <Input />
//                     </Form.Item>
//                   ) : (
//                     <Form.Item
//                       label="Email"
//                       required
//                       name="email"
//                       rules={[
//                         {
//                           required: true,
//                           message: 'Vui lòng không bỏ trống email'
//                         }
//                       ]}
//                     >
//                       <Input />
//                     </Form.Item>
//                   )}

//                   <Form.Item
//                     label="Tên"
//                     name="name"
//                     rules={[
//                       {
//                         required: true,
//                         message: 'Vui lòng không bỏ trống mật khẩu'
//                       }
//                     ]}
//                   >
//                     <Input />
//                   </Form.Item>
//                   <Form.Item
//                     label="Nhập mật khẩu "
//                     name="password"
//                     rules={[
//                       {
//                         required: true,
//                         message: 'Vui lòng không bỏ trống mật khẩu'
//                       }
//                     ]}
//                   >
//                     <Input.Password />
//                   </Form.Item>
//                   <Form.Item
//                     label="Nhập lại mật khẩu"
//                     name="passwordConfirm"
//                     rules={[
//                       {
//                         required: true,
//                         message: 'Vui lòng không bỏ trống mật khẩu'
//                       }
//                     ]}
//                   >
//                     <Input.Password />
//                   </Form.Item>
//                   <Form.Item>
//                     <Button type="primary" htmlType="submit">
//                       Submit
//                     </Button>
//                   </Form.Item>
//                 </Form>
//               ) : (
//                 ''
//               )}
//             </>
//           ) : (
//             ''
//           )}
//           {current === 1 ? (
//             <>
//               <Form
//                 form={form}
//                 name="updateData"
//                 onFinish={handleSubmitInfor} // =onSubmit
//                 layout="vertical"
//               >
//                 <Form.Item
//                   label="Nhập mã otp"
//                   name="code"
//                   rules={[
//                     {
//                       required: true,
//                       message: 'Vui lòng không bỏ trống mật khẩu'
//                     }
//                   ]}
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item>
//                   <Button
//                     type="primary"
//                     htmlType="submit"
//                     style={{ width: '100%', height: '40px' }}
//                   >
//                     Submit
//                   </Button>
//                 </Form.Item>
//                 <Form.Item>
//                   <CustomSpinner />
//                   <a
//                     type="primary"
//                     style={{ width: '100%', height: '40px' }}
//                     onClick={sendOtp}
//                   >
//                     Send Otp Again
//                   </a>
//                 </Form.Item>
//               </Form>
//             </>
//           ) : (
//             ''
//           )}
//           {current === 2 ? (
//             <>
//               <Form
//                 form={form}
//                 name="updateData"
//                 onFinish={handleSubmitInfor} // =onSubmit
//                 layout="vertical"
//               >
//                 <Form.Item
//                   label="Nhập mã otp"
//                   name="code"
//                   rules={[
//                     {
//                       required: true,
//                       message: 'Vui lòng không bỏ trống mật khẩu'
//                     }
//                   ]}
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item>
//                   <Button
//                     type="primary"
//                     htmlType="submit"
//                     style={{ width: '100%', height: '40px' }}
//                   >
//                     Submit
//                   </Button>
//                 </Form.Item>
//                 <Form.Item>
//                   <CustomSpinner />
//                   <a
//                     type="primary"
//                     style={{ width: '100%', height: '40px' }}
//                     onClick={sendOtp}
//                   >
//                     Send Otp Again
//                   </a>
//                 </Form.Item>
//               </Form>
//             </>
//           ) : (
//             ''
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default SignUp;
