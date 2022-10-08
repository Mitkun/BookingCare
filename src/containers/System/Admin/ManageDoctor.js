import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as action from '../../../store/actions';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: '',
      contentHTML: '',
      selectedDoctor: '',
      description: '',
      listDoctors: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
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
  }

  // Finish!
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
    console.log('handleEditorChange', html, text);
  };

  handleSaveContentMarkdown = () => {
    console.log('state', this.state);
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
    });
  };

  handleChange = (selectedDoctor) => {
    this.setState({ selectedDoctor });
  };

  handleOnChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  render() {
    const { selectedDoctor, description } = this.state;

    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Tạo thêm thông tin doctor</div>
        <div className="more-info">
          <div className="content-left form-group">
            <label>Chọn bác sĩ</label>
            <Select value={selectedDoctor} onChange={this.handleChange} options={this.state.listDoctors} />
          </div>
          <div className="content-right ">
            <label>Thông tin giới thiệu</label>
            <textarea
              className="form-control"
              rows={4}
              onChange={(event) => this.handleOnChangeDesc(event)}
              value={description}
            ></textarea>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: '500px' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
        <button onClick={() => this.handleSaveContentMarkdown()} className="save-content-doctor">
          Lưu thông tin
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(action.fetchAllDoctors()),
    saveDetailDoctor: (data) => dispatch(action.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
