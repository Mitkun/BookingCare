import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomeFooter extends Component {
  render() {
    return (
      <>
        <div className="home-footer">
          <p>
            &copy; 2022 Mitkun. More infromation, please visit my Github.
            <a href="https://www.google.com.vn" target="_blank">
              &#8594; Click here &#8592;
            </a>
          </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
