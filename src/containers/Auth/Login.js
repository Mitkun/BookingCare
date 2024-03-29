import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import * as actions from '../../store/actions';
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isShowPassword: false,
      errMessage: '',
    };
  }

  hanldeOnChangUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  hanldeOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: '',
    });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      } else if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log('login succeeds');
      }
    } catch (err) {
      console.log('err', err);
      if (err.response) {
        if (err.response.data) {
          this.setState({
            errMessage: err.response.data.message,
          });
        }
      }
    }
  };

  listenerEnterKey = (evn) => {
    if (evn.code === 'Enter') {
      this.handleLogin();
    }
  };

  render() {
    document.addEventListener('keydown', this.listenerEnterKey);
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form-group login-input">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={this.state.username}
                onChange={(even) => {
                  this.hanldeOnChangUsername(even);
                }}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Password:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your password"
                value={this.state.password}
                onChange={(even) => {
                  this.hanldeOnChangePassword(even);
                }}
              />
            </div>
            <div className="col-12" style={{ color: 'red' }}>
              {this.state.errMessage}
            </div>
            <div className="col-12">
              <button onClick={this.handleLogin} className="btn-login">
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password">Forgot your password?</span>
            </div>
            <div className="col-12 mt-3 text-center">
              <span className="text-other-login">Or Login with:</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
