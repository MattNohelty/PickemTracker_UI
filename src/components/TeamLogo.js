import React, { Component } from 'react';


class TeamLogo extends Component {

  render() {
    return (
      //TODO React docs say this is bad practice https://facebook.github.io/react-native/docs/images.html
      <span>
        <img src={require('../img/logo/small/' + this.props.team + '.png')} style={{width: 20, height: 20}} />
      </span>
    );
  }

}

export default TeamLogo;
