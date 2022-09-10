import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
    };
  }

  componentDidMount() {
    console.log('data user', this.props.currentUser);
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: 'hard code',
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (event, id) => {
    let updateState = { ...this.state };
    updateState[id] = event.target.value;
    this.setState({
      ...updateState,
    });
  };

  checkValideInput = () => {
    let valid = true;
    let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        valid = false;
        console.log('awef');
        alert('Missing parameter: ' + arrInput[i]);
        break;
      }
    }

    return valid;
  };

  handleSaveUser = () => {
    let checkValid = this.checkValideInput();
    if (checkValid) {
      //TODO call api edit modal
      this.props.editUser(this.state);
    }
  };

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.toggle} className={this.props.className} centered size="lg">
        <ModalHeader toggle={this.toggle}>Create a new</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="inut-container">
              <label>Email</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, 'email');
                }}
                value={this.state.email}
                disabled
              />
            </div>
            <div className="inut-container">
              <label>Password</label>
              <input
                type="password"
                onChange={(event) => {
                  this.handleOnChangeInput(event, 'password');
                }}
                value={this.state.password}
                disabled
              />
            </div>
            <div className="inut-container">
              <label>First name</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, 'firstName');
                }}
                value={this.state.firstName}
              />
            </div>
            <div className="inut-container">
              <label>Last name</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, 'lastName');
                }}
                value={this.state.lastName}
              />
            </div>
            <div className="inut-container">
              <label>Address</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, 'address');
                }}
                value={this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleSaveUser}>
            Edit user
          </Button>{' '}
          <Button color="secondary" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
