import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import * as action from '../../../store/actions';
import { LANGUAGES, path } from '../../../utils/constant';
import { withRouter } from 'react-router';

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: [],
    };
  }

  componentDidUpdate(preProps, prevState, snapshot) {
    if (preProps.topDoctors !== this.props.topDoctors) {
      this.setState({
        arrDoctor: this.props.topDoctors,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopDoctor();
  }

  handleViewDetailDoctor = (doctor) => {
    this.props.history.push(`${path.DETAIL_DOCTOR}/${doctor.id}`);
  };

  render() {
    const { arrDoctor } = this.state;
    const { language } = this.props;

    return (
      <>
        <div className="section-share section-outstanding-doctor">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="homepage.outstanding-doctor" />
              </span>
              <button className="btn-section">
                <FormattedMessage id="homepage.more-info" />
              </button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {arrDoctor?.length &&
                  arrDoctor.map((doctor, index) => {
                    let imageBase64 = '';
                    if (doctor.image) {
                      imageBase64 = new Buffer(doctor.image, 'base64').toString('binary');
                    }
                    let nameVi = `${doctor.positionData.valueVi}: ${doctor.lastName} ${doctor.firstName}`;
                    let nameEn = `${doctor.positionData.valueEn}: ${doctor.firstName} ${doctor.lastName}`;
                    return (
                      <div
                        key={index}
                        className="section-custommize card-doctor"
                        onClick={() => this.handleViewDetailDoctor(doctor)}
                      >
                        <div className="outer-bg">
                          <div
                            className="bg-image section-outstanding-doctor"
                            style={{ backgroundImage: `url(${imageBase64})` }}
                          />
                        </div>
                        <div className="position text-center">
                          <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                          <div>Cơ xương khớp 1</div>
                        </div>
                      </div>
                    );
                  })}
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
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    topDoctors: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctor: () => dispatch(action.fetchTopDoctor()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
