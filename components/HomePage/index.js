import React from 'react';
import { classPrefixor } from 'utils/classPrefixor';
import logo from 'assets/images/zola-logo.png';
import { Carousel } from 'antd';
import carousel1 from 'assets/images/carousel-home-1.jpg';
import carousel2 from 'assets/images/carousel-home-2.jpg';
import carousel3 from 'assets/images/carousel-home-3.jpg';
import carousel4 from 'assets/images/carousel-home-4.jpg';
import useChangeMeta from 'components/common/hook/useChangeMeta';

const prefix = 'homePage';
const c = classPrefixor(prefix);

const HomePage = () => {
  useChangeMeta('Trang Chủ');
  return (
    <div className={c`main-container`}>
      <div
        style={{
          width: '475px',
          textAlign: 'center',
          color: 'rgb(34, 34, 34)'
        }}
        className="title-header"
      >
        <div
          style={{
            fontSize: '59px',
            color: '#8E8E93',
            marginTop: '10px',
            width: '70%',
            float: 'left'
          }}
        >
          <span>Welcome to </span>
        </div>
        <div className="img-title">
          <img src={logo} style={{ width: '90%' }} />
        </div>
      </div>
      <div className="clear-float"></div>
      <div className="content">
        <p>
          A place you can connect with your friend, family, ex, everyday,
          everytime.
        </p>
        <span>We share our passion, you share your happiness</span>
      </div>
      <div className="img-home">
        <Carousel effect="fade" autoplay autoplaySpeed={2000}>
          <div>
            <img src={carousel1} className="img-carousel" />
            <div className="content-carousel">
              <p className="title-carousel">
                Giải quyết công việc hiệu quả lên đến 40%
              </p>
              <p className="subcontent">Với Zola</p>
            </div>
          </div>
          <div>
            <img src={carousel2} className="img-carousel" />
            <div className="content-carousel">
              <p className="title-carousel">Chat nhóm với đồng nghiệp</p>
              <p className="subcontent">
                Tiện lợi hơn, nhờ các công cụ hỗ trợ chat trên máy tính
              </p>
            </div>
          </div>
          <div>
            <img src={carousel3} className="img-carousel" />
            <div className="content-carousel">
              <p className="title-carousel">Trải nghiệm xuyên suốt</p>
              <p className="subcontent">
                Kết nối và giải quyết công việc trên mọi thiết bị với dữ liệu
                luôn được đồng bộ
              </p>
            </div>
          </div>
          <div>
            <img src={carousel4} className="img-carousel" />
            <div className="content-carousel">
              <p className="title-carousel">
                Gọi nhóm và làm việc hiệu quả với Zola Group Call
              </p>
              <p className="subcontent">Trao đổi công việc mọi lúc mọi nơi</p>
            </div>
          </div>
        </Carousel>
        <img />
      </div>
    </div>
  );
};
export default HomePage;
