import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'

class ModalUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
    }
    this.listenToEmitter()
  }

  listenToEmitter() {
    emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
      //reset state
      this.setState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
      })
    })
  }

  componentDidMount() {
  }

  toggle = () => {
    this.props.toggleFromParent()
  }

  handleOnChangeInput = (event, id) => {
    let updateState = { ...this.state };
    updateState[id] = event.target.value;
    this.setState({
      ...updateState
    })
  }

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
  }

  handleAddNewUser = () => {
    let checkValid = this.checkValideInput();
    if (checkValid) {
      //TODO call api create modal
      this.props.createNewUser(this.state)
    }
  }


  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.toggle}
        className={this.props.className}
        centered
        size='lg'
      >
        <ModalHeader toggle={this.toggle}>Create a new</ModalHeader>
        <ModalBody>
          <div className='modal-user-body'>
            <div className='inut-container'>
              <label>Email</label>
              <input
                type='text'
                onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                value={this.state.email}
              />
            </div>
            <div className='inut-container'>
              <label>Password</label>
              <input
                type='password'
                onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                value={this.state.password}
              />
            </div>
            <div className='inut-container'>
              <label>First name</label>
              <input
                type='text'
                onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }}
                value={this.state.firstName}
              />
            </div>
            <div className='inut-container'>
              <label>Last name</label>
              <input
                type='text'
                onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }}
                value={this.state.lastName}
              />
            </div>
            <div className='inut-container'>
              <label>Address</label>
              <input
                type='text'
                onChange={(event) => { this.handleOnChangeInput(event, 'address') }}
                value={this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={this.handleAddNewUser}
          >Add new user</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }

}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);