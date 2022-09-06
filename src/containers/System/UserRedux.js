import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../services/userService';
import { LANGUAGES } from '../../utils';
import * as action from '../../store/actions'

class UserRedux extends Component {

  constructor(props) {
    super(props);
    this.state = {
      genderArr: []
    }
  }

  async componentDidMount() {

    this.props.getGenderStart()

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
      this.setState({
        genderArr: this.props.genderRedux
      })
    }
  }


  render() {
    let { language, genderRedux } = this.props
    let { genderArr } = this.state
    console.log('genderRedux', genderRedux);

    return (
      <div className='user-redux-container'>
        <div className="title" >User Redux</div>
        <div className="user-redux-body" >
          <div className='container'>
            <form>
              <div className="row">
                <div className='col-12 h2'><FormattedMessage id='manage-user.add' /></div>
                <div className="col-6">
                  <label for="inputEmail"><FormattedMessage id='manage-user.email' /></label>
                  <input type="email" className="form-control" id="inputEmail" placeholder="Email" />
                </div>
                <div className="col-6">
                  <label for="inputPassword"><FormattedMessage id='manage-user.password' /></label>
                  <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label for="firstName"><FormattedMessage id='manage-user.first-name' /></label>
                  <input type="text" className="form-control" id="firstName" placeholder="First name" />
                </div>
                <div className="col-6">
                  <label for="lastName"><FormattedMessage id='manage-user.last-name' /></label>
                  <input type="text" className="form-control" id="lastName" placeholder="Last name" />
                </div>
              </div>
              <div className='row'>
                <div className="col-9">
                  <label for="inputAddress"><FormattedMessage id='manage-user.address' /></label>
                  <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                </div>
                <div className="col-3">
                  <label for="inputPhone"><FormattedMessage id='manage-user.phone-number' /></label>
                  <input type="text" className="form-control" id="inputPhone" placeholder="Apartment, studio, or floor" />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-3">
                  <label for="inputGender"><FormattedMessage id='manage-user.gender' /></label>
                  <select id="inputGender" className="form-control">
                    {genderArr?.length && genderArr.map(item => <option>
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </option>)}
                  </select>
                </div>
                <div className="form-group col-md-3">
                  <label for="inputPosition"><FormattedMessage id='manage-user.position' /></label>
                  <select id="inputPosition" className="form-control">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div className="form-group col-md-3">
                  <label for="inputRoleId"><FormattedMessage id='manage-user.role' /></label>
                  <select id="inputRoleId" className="form-control">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div className="form-group col-md-3">
                  <label for="inputImage"><FormattedMessage id='manage-user.image' /></label>
                  <input type="text" className="form-control" id="inputImage" placeholder="Apartment, studio, or floor" />
                </div>
              </div>
              <div className='col-12 mt-3'>
                <button type="submit" className="btn btn-primary"><FormattedMessage id='manage-user.save' /></button>
              </div>
            </form>
          </div>
        </div>
      </div>

    )
  }

}

const mapStateToProps = state => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGenderStart: () => dispatch(action.fetchGenderStart())
    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
