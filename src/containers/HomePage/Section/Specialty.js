import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss'
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from '../../../assets/specialty/120331-co-xuong-khop.jpg'

class Specialty extends Component {


  render() {

    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1
    };

    return (
      <>
        <div className='section-specialty'>
          <div className='specialty-container'>
            <div>
              <h2>Chuyên khoa phổ biến</h2>
              <button>Xem thêm</button>
            </div>
            <Slider {...settings}>
              <div className='specialty-body'>
                <img src={specialtyImg} />
                <h3>Cơ xương khớp</h3>
              </div>
              <div className='specialty-body'>
                <img src={specialtyImg} />
                <h3>Cơ xương khớp</h3>
              </div>
              <div className='specialty-body'>
                <img src={specialtyImg} />
                <h3>Cơ xương khớp</h3>
              </div>
              <div className='specialty-body'>
                <img src={specialtyImg} />
                <h3>Cơ xương khớp</h3>
              </div>
              <div className='specialty-body'>
                <img src={specialtyImg} />
                <h3>Cơ xương khớp</h3>
              </div>
              <div className='specialty-body'>
                <img src={specialtyImg} />
                <h3>Cơ xương khớp</h3>
              </div>
            </Slider>
          </div>
        </div>
      </>
    );
  }

}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
