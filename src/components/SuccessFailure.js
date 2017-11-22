import React, { Component } from 'react';

class SuccessFailure extends Component {

  render() {
    return (
      //TODO React docs say this is bad practice https://facebook.github.io/react-native/docs/images.html
      <span>
        <img src={this.props.success ? require('../img/success.png') : require('../img/error.png')} 
             alt={this.props.success ? "Y" : "N"} 
             style={{width: 16, height: 16}} />
      </span>
    );
  }
}

SuccessFailure.propTypes = {
  success: React.PropTypes.bool.isRequired
};

export default SuccessFailure;
