import React, { PureComponent } from 'react';
import SignUpUser from 'components/Account/SignUp';
import withAuth from 'components/common/withAuth';

class SignUp extends PureComponent {
  render() {
    return <SignUpUser />;
  }
}

export default withAuth(SignUp);

SignUp.pageName = 'SignUp';
