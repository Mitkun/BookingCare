import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

class MedicalFacility extends Component {
  render() {
    return (
      <>
        <div className="section-share section-medical-facility">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">Cơ sở y tế nổi bật</span>
              <button className="btn-section">Xem thêm</button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="section-custommize">
                  <div className="bg-image section-medical-facility" />
                  <h3>Hệ thống thu cúc 1</h3>
                </div>
                <div className="section-custommize">
                  <div className="bg-image section-medical-facility" />
                  <h3>Hệ thống thu cúc 2</h3>
                </div>
                <div className="section-custommize">
                  <div className="bg-image section-medical-facility" />
                  <h3>Hệ thống thu cúc 3</h3>
                </div>
                <div className="section-custommize">
                  <div className="bg-image section-medical-facility" />
                  <h3>Hệ thống thu cúc 4</h3>
                </div>
                <div className="section-custommize">
                  <div className="bg-image section-medical-facility" />
                  <h3>Hệ thống thu cúc 5</h3>
                </div>
                <div className="section-custommize">
                  <div className="bg-image section-medical-facility" />
                  <h3>Hệ thống thu cúc 6</h3>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
