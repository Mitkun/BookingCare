import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';

import './ManageSchedule.scss';
import * as action from '../../../store/actions';
import { CRUD_ACTIONS, dateFormat, LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService';

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedDoctor: '',
      currentDate: new Date(),
      rangeTime: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchAllScheduleTime();
  }

  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData?.length) {
      inputData.map((doctor, index) => {
        let option = {};
        let labelVi = `${doctor.lastName} ${doctor.firstName}`;
        let labelEn = `${doctor.firstName} ${doctor.lastName}`;
        option.label = language === LANGUAGES.VI ? labelVi : labelEn;
        option.value = doctor.id;
        result.push(option);
      });
    }
    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors || prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data?.length) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        rangeTime: data,
      });
    }
  }

  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
  };

  handleChangeDatePicker = (date) => {
    console.log('date', date[0]);
    this.setState({
      currentDate: date[0],
    });
  };

  handleSaveSchedule = async () => {
    let { selectedDoctor, currentDate, rangeTime } = this.state;
    let result = [];
    if (isNaN(currentDate.getTime())) {
      toast.error('Invalid date!');
      return;
    }

    if (_.isEmpty(selectedDoctor)) {
      toast.error('Invalid doctor!');
      return;
    }

    // let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    // let formattedDate = currentDate.setUTCHours(0, 0, 0, 0);

    if (rangeTime?.length) {
      let selectedTime = rangeTime.filter((item) => item.isSelected);
      console.log('currentdate', currentDate);
      console.log('gettime', currentDate.getTime());

      if (selectedTime?.length) {
        selectedTime.map((schedule) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = currentDate.getTime();
          object.timeType = schedule.keyMap;
          result.push(object);
        });

        let res = await saveBulkScheduleDoctor({
          arrSchedule: result,
        });

        // console.log('formattedDate', formattedDate);
      }
    }
  };

  render() {
    const { isLoggedIn, allScheduleTime } = this.props;
    const { selectedDoctor, currentDate, rangeTime, language } = this.state;

    return (
      <div className="manage-schedule-container">
        <div className="m-s-title">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label>Chọn bác sĩ</label>
              <Select value={selectedDoctor} onChange={this.handleChangeSelect} options={this.state.listDoctors} />
            </div>
            <div className="col-6 form-group">
              <label>Chọn ngày</label>
              <DatePicker
                className="form-control"
                onChange={this.handleChangeDatePicker}
                // selected={currentDate}
                value={currentDate}
                minDate={new Date()}
              />
            </div>

            <div className="col-12 pick-hour-container">
              {rangeTime?.length &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      className={`btn m-1 ${item.isSelected ? 'btn-warning' : 'btn-danger'}`}
                      key={index}
                      onClick={() => {
                        let rangeTimeUpdate = [...rangeTime];
                        rangeTimeUpdate[index].isSelected = !rangeTimeUpdate[index].isSelected;
                        this.setState({
                          rangeTime: rangeTimeUpdate,
                        });
                      }}
                    >
                      {item.valueVi}
                    </button>
                  );
                })}
            </div>

            <button className="btn btn-primary mt-3" onClick={this.handleSaveSchedule}>
              Lưu thông tin
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(action.fetchAllDoctors()),
    fetchAllScheduleTime: () => dispatch(action.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
