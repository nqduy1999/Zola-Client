import { Button, Col, Input, Row } from 'antd';
import logo from 'assets/images/zola-logo.png';
import AddFriend from 'components/Friend/AddFriend';
import PropTypes from 'prop-types';
import { useState } from 'react';
const styleButton = {
  border: 'none',
  width: '45px',
  color: '#8e8e93'
};
const Header = props => {
  const { userData } = props;
  const { Search } = Input;
  const [visibleModalSearch, setVisibleModalSearch] = useState(false);
  return (
    <div className="right-section">
      <div className="zola-section">
        <Row
          className="zola-header"
          style={{
            padding: '20px',
            width: '110%'
          }}
        >
          <Col
            span={5}
            className="logo-header"
            style={{
              display: 'inline-block'
            }}
          >
            <img src={logo} alt="hihi" />
          </Col>
          <Col
            span={8}
            style={{
              display: 'inline-block',
              marginTop: '26px',
              fontWeight: '350',
              fontSize: '14px',
              color: '#000'
            }}
          >
            <span>- {userData ? userData.name : ''}</span>
          </Col>
        </Row>
        <Row className="zola-section-mid" style={{ width: '110%' }}>
          <Col span={15} className="search-zola-message">
            <Search placeholder="Nhập vào tin nhắn" enterButton />
          </Col>
          <Col span={6} className="icon-zola-message">
            <Button
              style={styleButton}
              onClick={() => setVisibleModalSearch(true)}
            >
              <i
                className="fa fa-user-plus"
                style={{ marginRight: '20px' }}
              ></i>
            </Button>
            <i className="fa fa-plus"></i>
          </Col>
        </Row>
      </div>
      <AddFriend
        visible={visibleModalSearch}
        setVisible={setVisibleModalSearch}
      />
    </div>
  );
};
export default Header;
Header.propTypes = {
  children: PropTypes.objectOf(PropTypes.any),
  userData: PropTypes.objectOf(PropTypes.any)
};
Header.defaultProps = {
  children: {},
  userData: {}
};
