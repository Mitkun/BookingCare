import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import * as action from '../../../store/actions';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: '',
      isOpen: false,

      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      gender: '',
      position: '',
      role: '',
      avatar: '',
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    // try {
    //   let res = await getAllCodeService('gender');
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       genderArr: res.data
    //     })
    //   }

    // } catch (error) {
    //   console.log(error);
    // }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let genderArrUpdate = this.props.genderRedux;
      this.setState({
        genderArr: genderArrUpdate,
        gender: genderArrUpdate?.length ? genderArrUpdate[0].keyword : '',
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let positionArrUpdate = this.props.positionRedux;
      this.setState({
        positionArr: positionArrUpdate,
        position: positionArrUpdate?.length ? positionArrUpdate[0].keyword : '',
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let roleArrUpdate = this.props.roleRedux;
      this.setState({
        roleArr: roleArrUpdate,
        role: roleArrUpdate?.length ? roleArrUpdate[0].keyword : '',
      });
    }

    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        gender: '',
        position: '',
        role: '',
        avatar: '',
      });
    }
  }

  handleOnChangeImage = (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: file,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  handleSaveUser = () => {
    // let isValid = this.checkValidateInput();
    // if (!isValid) return;

    //fire redux action
    this.props.createNewUser({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phonenumber: this.state.phoneNumber,
      gender: this.state.gender,
      roleId: this.state.role,
      positionId: this.state.position,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];

    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert('This input is required: ' + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  onChangeInput = (evt, id) => {
    let copyState = { ...this.state };
    copyState[id] = evt.target.value;
    this.setState({
      ...copyState,
    });
  };

  render() {
    let { language, genderRedux } = this.props;
    let {
      genderArr,
      isLoadingGender,
      roleArr,
      positionArr,
      previewImgURL,
      isOpen,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
      role,
      avatar,
    } = this.state;

    return (
      <div className="user-redux-container">
        <div className="title">User Redux</div>
        <div className="user-redux-body">
          <div className="container">
            <form>
              <div className="row">
                <div className="col-12 h2">
                  <FormattedMessage id="manage-user.add" />
                </div>
                <div className="col-6">
                  <label for="inputEmail">
                    <FormattedMessage id="manage-user.email" />
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail"
                    placeholder="Email"
                    value={email}
                    onChange={(evt) => {
                      this.onChangeInput(evt, 'email');
                    }}
                  />
                </div>
                <div className="col-6">
                  <label for="inputPassword">
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(evt) => {
                      this.onChangeInput(evt, 'password');
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label for="firstName">
                    <FormattedMessage id="manage-user.first-name" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="First name"
                    value={firstName}
                    onChange={(evt) => {
                      this.onChangeInput(evt, 'firstName');
                    }}
                  />
                </div>
                <div className="col-6">
                  <label for="lastName">
                    <FormattedMessage id="manage-user.last-name" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(evt) => {
                      this.onChangeInput(evt, 'lastName');
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-9">
                  <label for="inputAddress">
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="1234 Main St"
                    value={address}
                    onChange={(evt) => {
                      this.onChangeInput(evt, 'address');
                    }}
                  />
                </div>
                <div className="col-3">
                  <label for="inputPhone">
                    <FormattedMessage id="manage-user.phone-number" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPhone"
                    placeholder="Apartment, studio, or floor"
                    value={phoneNumber}
                    onChange={(evt) => {
                      this.onChangeInput(evt, 'phoneNumber');
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-3">
                  <label for="inputGender">
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select
                    id="inputGender"
                    className="form-control"
                    // value={gender}
                    onChange={(evt) => {
                      this.onChangeInput(evt, 'gender');
                    }}
                  >
                    {genderArr?.length &&
                      genderArr.map((item, index) => (
                        <option key={index} value={item.keyword}>
                          {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group col-md-3">
                  <label for="inputPosition">
                    <FormattedMessage id="manage-user.position" />
                  </label>
                  <select
                    id="inputPosition"
                    className="form-control"
                    // value={position}
                    onChange={(evt) => {
                      this.onChangeInput(evt, 'position');
                    }}
                  >
                    {positionArr?.length &&
                      positionArr.map((item, index) => (
                        <option key={index} value={item.keyword}>
                          {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group col-md-3">
                  <label for="inputRoleId">
                    <FormattedMessage id="manage-user.role" />
                  </label>
                  <select
                    id="inputRoleId"
                    className="form-control"
                    // value={role}
                    onChange={(evt) => {
                      this.onChangeInput(evt, 'role');
                    }}
                  >
                    {roleArr?.length &&
                      roleArr.map((item, index) => (
                        <option key={index} value={item.keyword}>
                          {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group col-md-3">
                  <label for="inputImage">
                    <FormattedMessage id="manage-user.image" />
                  </label>
                  <div className="preview-img-container">
                    <input id="previewImg" type="file" hidden onChange={(event) => this.handleOnChangeImage(event)} />
                    <label className="label-upload btn btn-danger" for="previewImg">
                      Tải ảnh <i className="fas fa-upload"></i>{' '}
                    </label>
                    <div
                      className="preview-image"
                      style={{
                        height: '100px',
                        width: '100%',
                        border: '1px solid red',
                        backgroundImage: `url(${previewImgURL})`,
                        background: 'center center no-repeat',
                        backgroundSize: 'contain',
                      }}
                      onClick={() => this.openPreviewImage()}
                    ></div>
                  </div>
                </div>
              </div>
            </form>
            <div className="col-12 my-3">
              <button className="btn btn-primary" onClick={() => this.handleSaveUser()}>
                <FormattedMessage id="manage-user.save" />
              </button>
            </div>
          </div>

          <div className="container my-5">
            <TableManageUser />
          </div>
        </div>

        {isOpen && <Lightbox mainSrc={previewImgURL} onCloseRequest={() => this.setState({ isOpen: false })} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(action.fetchGenderStart()),
    getPositionStart: () => dispatch(action.fetchPositionStart()),
    getRoleStart: () => dispatch(action.fetchRoleStart()),
    createNewUser: (data) => dispatch(action.createNewUser(data)),
    fetchUserRedux: () => dispatch(action.fetchAllUsersStart()),

    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
