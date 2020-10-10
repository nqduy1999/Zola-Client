import React, { PureComponent } from 'react';
import SignUpUser from 'components/Account/SignUp';
import { SignUpProvider } from 'components/common/context/SignUpContext';

class SignUp extends PureComponent {
  render() {
    return (
      <SignUpProvider>
        <SignUpUser />
      </SignUpProvider>
    );
  }
}

export default SignUp;

SignUp.pageName = 'SignUp';
