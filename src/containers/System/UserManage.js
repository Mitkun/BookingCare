import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsersApi, createNewUserApi, deleteUserApi, editUserApi } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    const response = await getAllUsersApi('ALL');
    if (response && response.errCode === 0) {
      this.setState({
        users: response.users,
      });
    }
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  toggleEditUserModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };

  createNewUser = async (data) => {
    try {
      const response = await createNewUserApi(data);

      if (response && response.errCode !== 0) {
        alert(response.message);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit('EVENT_CLEAR_MODAL_DATA');
      }
    } catch (error) {
      console.log('err', error);
    }
  };

  handleDeleteUser = async (user) => {
    console.log('user', user);
    try {
      let res = await deleteUserApi(user.id);

      if (res && res.errCode === 0) {
        await this.getAllUsersFromReact();
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log('err', error);
    }
  };

  handleEditUser = (user) => {
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };

  editUser = async (user) => {
    try {
      const res = await editUserApi(user);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenModalEditUser: false,
        });
        this.getAllUsersFromReact();
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log('err', error);
    }
  };

  render() {
    let users = this.state.users;

    return (
      <div className="users-container">
        <div className="title text-center">Manager users with Mit</div>
        <div className="mx-4">
          <button className="btn btn-primary px-3" onClick={this.handleAddNewUser}>
            <i className="fa fa-plus"></i> Add new user
          </button>
        </div>
        <div className="users-table mt-3 mx-4">
          <table id="customers">
            <thead>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button onClick={() => this.handleEditUser(item)}>
                          <i className="fa fa-pencil-alt"></i>
                        </button>
                        <button onClick={() => this.handleDeleteUser(item)}>
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={this.toggleEditUserModal}
            currentUser={this.state.userEdit}
            editUser={this.editUser}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
