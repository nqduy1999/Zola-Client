import React, { PureComponent } from 'react';
import ForgotPassword from 'components/Account/ForgotPassword';

class ForgotPass extends PureComponent {
  render() {
    return <ForgotPassword />;
  }
}

export default ForgotPass;

ForgotPass.pageName = 'ForgotPassword';
