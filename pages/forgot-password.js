import React, { PureComponent } from 'react';
import ForgotPassword from 'components/Account/ForgotPassword';
import withAuth from 'components/common/withAuth';

class ForgotPass extends PureComponent {
  render() {
    return <ForgotPassword />;
  }
}

export default withAuth(ForgotPass);

ForgotPass.pageName = 'ForgotPassword';
