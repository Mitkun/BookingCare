import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';



class HandBook extends Component {


  render() {

    return (
      <>
        <div className='section-share section-handbook'>
          <div className='section-container'>
            <div className='section-header'>
              <span className='title-section'>Cẩm nang</span>
              <button className='btn-section'>Xem thêm</button>
            </div>
            <div className='section-body'>
              <Slider {...this.props.settings}>
                <div className='section-custommize'>
                  <div className='bg-image section-handbook' />
                  <h3>Cơ xương khớp</h3>
                </div>
                <div className='section-custommize'>
                  <div className='bg-image section-handbook' />
                  <h3>Cơ xương khớp</h3>
                </div>
                <div className='section-custommize'>
                  <div className='bg-image section-handbook' />
                  <h3>Cơ xương khớp</h3>
                </div>
                <div className='section-custommize'>
                  <div className='bg-image section-handbook' />
                  <h3>Cơ xương khớp</h3>
                </div>
                <div className='section-custommize'>
                  <div className='bg-image section-handbook' />
                  <h3>Cơ xương khớp</h3>
                </div>
                <div className='section-custommize'>
                  <div className='bg-image section-handbook' />
                  <h3>Cơ xương khớp</h3>
                </div>
              </Slider>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
