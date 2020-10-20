import withNotAuth from 'components/common/withNotAuth';
import HomePageComponent from 'components/HomePage';
import DefaultLayout from 'components/layouts';
import React, { PureComponent } from 'react';

class HomePage extends PureComponent {
  render() {
    return (
      <DefaultLayout>
        <HomePageComponent />
      </DefaultLayout>
    );
  }
}

export default withNotAuth(HomePage);

HomePage.pageName = 'HomePage';
