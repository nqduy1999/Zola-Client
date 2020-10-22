import withNotAuth from 'components/common/withNotAuth';
import DefaultLayout from 'components/layouts';
import React, { PureComponent } from 'react';

class HomePage extends PureComponent {
  render() {
    return <DefaultLayout></DefaultLayout>;
  }
}

export default withNotAuth(HomePage);

HomePage.pageName = 'HomePage';
