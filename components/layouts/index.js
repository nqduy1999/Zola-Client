import React from 'react';
import Sidebar from './SideBars';
import PropTypes from 'prop-types';
import { classPrefixor } from 'utils/classPrefixor';
import { Col, Row } from 'antd';
// import { useDispatch, useSelector } from 'react-redux';
// import { getProfileUser } from 'actions/userAction';

const prefix = 'layout-main';
const c = classPrefixor(prefix);

const DefaultLayout = props => {
  const state = useSelector(state => state.accountData);
  // const dispatch = useDispatch();
  console.log(state);
  // useEffect(() => {
  //   auth_token && dispatch(getProfileUser(auth_token));
  // }, [dispatch, auth_token]);
  return (
    <main aria-hidden="true">
      <div aria-hidden="true" className={c`container`}>
        <Row>
          <Col flex="425px">
            <Sidebar />
          </Col>
          <Col flex="auto">
            <div aria-hidden="true" className={c`container__body`}>
              {props.children}
            </div>
          </Col>
        </Row>
      </div>
    </main>
  );
};
export default DefaultLayout;
DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

DefaultLayout.defaultProps = {
  children: {}
};
