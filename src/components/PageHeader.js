import React, { Component } from 'react';
import '../App.css';
import RealTimeScores from './RealTimeScores';

class PageHeader extends Component {

  render() {
    return (
      <div>
        <h3 className="text-center">{ this.props.headingText }</h3>
        <hr/>
        <RealTimeScores />
      </div>
    );
  }
}

export default PageHeader;
