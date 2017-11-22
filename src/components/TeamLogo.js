import React, { Component } from 'react';


class TeamLogo extends Component {

  render() {
    return (
      //TODO React docs say this is bad practice https://facebook.github.io/react-native/docs/images.html
      <span>
        <img src={require('../img/logo/small/' + this.props.team + '.png')} alt="{this.props.team}" style={{width: 20, height: 20}} />
      </span>
    );
  }

}

TeamLogo.propTypes = {
  team: React.PropTypes.string.isRequired
};

export default TeamLogo;
