import React, { PureComponent } from 'react';
import SignUpUser from 'components/Account/SignUp';

class SignUp extends PureComponent {
  render() {
    return <SignUpUser />;
  }
}

export default SignUp;

SignUp.pageName = 'SignUp';
