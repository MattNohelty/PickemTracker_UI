import React, { Component } from 'react';
import TeamLogo from './TeamLogo';

class Score extends Component {

  isScoreOverTotal() {
    if (this.props.score.awayScore + this.props.score.homeScore > this.props.score.game.overUnder) {
      return true;
    }
    else if (this.props.score.awayScore + this.props.score.homeScore < this.props.score.game.overUnder) {
      return false;
    }
    return null;
  }

  overUnderClass(over) {
    var isScoreOver = this.isScoreOverTotal();
    if (isScoreOver == null) {
      return ""; //Push
    }
    else {
      return (over === isScoreOver) ? 'winner' : 'loser';
    }
  }

  render() {

    var isHomeWinner = false;

    return (
        <div className="score_container">

          <div>
            <span className="away">
              <TeamLogo team={this.props.score.game.awayTeam} size={"small"}/>
              <span className="score">
                {this.props.score.awayScore}
              </span>
            </span>
            <span>
              Spread: {this.props.score.game.spread}
            </span>
          </div>

          <div>
            <span className="home">
              at <TeamLogo team={this.props.score.game.homeTeam} size={"small"}/>
              <span className="score">
                {this.props.score.homeScore}
              </span>
            </span>
            <span>
              <span className={this.overUnderClass(true)}>Over</span>/<span className={this.overUnderClass(false)}>Under</span>: {this.props.score.game.overUnder}
            </span>
          </div>
        </div>
    );
  }
}

export default Score;
