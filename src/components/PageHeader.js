import React, { Component } from 'react';
import '../App.css';

class PageHeader extends Component {

  render() {
    return (
      <div>
        <h3 className="text-center">{ this.props.headingText }</h3>
        <hr/>
      </div>
    );
  }
}

export default PageHeader;
