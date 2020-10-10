import HomeComponent from 'components/HomePage';
import DefaultLayout from 'components/layouts';
import React, { PureComponent } from 'react';

class Home extends PureComponent {
  render() {
    return (
      <DefaultLayout>
        <HomeComponent />
      </DefaultLayout>
    );
  }
}

export default Home;

Home.pageName = 'Home';
