import React, { Component } from 'react';
import { Link } from 'react-router';

class ButtonLink extends Component {

  
  render() {
    var linkStyle = {
      color: 'white',
      textDecoration: 'none'
    };

    return (
      <button className="btn btn-info log">
        <Link style={linkStyle} to={this.props.url}>{this.props.text}</Link>
      </button>
    );
  }
}

ButtonLink.propTypes = {
  url: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired
};

export default ButtonLink;
