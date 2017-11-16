import React, { Component } from 'react';

import PageHeader from './PageHeader';
import TeamLogo from './TeamLogo';
import SuccessFailure from './SuccessFailure';
import RealTimeScores from './RealTimeScores';

import { getAllGamesForYearWeek } from '../service/GameService';
import { getUserPicksForYearWeek } from '../service/PickService';
import { saveUserPicksForYearWeek } from '../service/PickService';

class WeekGameList extends Component {

  constructor() {
    super()
    this.state = {
      games: [],
      picks: new Map()
    };

    this.handleTeamInputChange = this.handleTeamInputChange.bind(this);
    this.handleSpreadBetInputChange = this.handleSpreadBetInputChange.bind(this);
    this.handleOverUnderInputChange = this.handleOverUnderInputChange.bind(this);
    this.savePicks = this.savePicks.bind(this);
  }

  componentDidMount() {
    this.getGames();
    this.getPicks();
  }

  /*
  Services
  */

  getGames() {
    getAllGamesForYearWeek(this.props.routeParams.year, this.props.routeParams.week).then((games) => {
      this.setState({ games: games});
    });
  }

  getPicks() {
    var pickMap = new Map();
    getUserPicksForYearWeek(this.props.routeParams.year, this.props.routeParams.week).then((picks) => {
      picks.forEach(function(pick) {
        pickMap.set(pick.gameId, pick);
      });
      this.setState({ picks: pickMap });
    });
  }

  savePicks() {
    this.validatePicks();
    saveUserPicksForYearWeek(this.props.routeParams.year, this.props.routeParams.week, Array.from(this.state.picks.values())).then(() => {
      alert("Success"); //TODO
    });
  }

  /*
  Input Change Handlers
  */

  handleTeamInputChange(event) {
    const target = event.target;
    const value = target.checked ? target.value : "none";
    const gameId = parseInt(target.name, 10);

    var pickMap = this.state.picks;
    var existingPick = pickMap.get(gameId);
    if (this.isDefined(existingPick)) {
      //Already have a pick for this game
      if (value === "none" && !this.isDefined(existingPick.overUnderPickOption)) {
        //No picks for this game so remove the whole pick
        pickMap.delete(gameId);
      }
      else if (value === "none") {
        //Over under pick for this game so just remove spread pick
        existingPick.spreadPickOption = value;
        existingPick.spreadPickPoints = 0;
        pickMap.set(gameId, existingPick);
      }
      else {
        //Adding a spread pick
        existingPick.spreadPickOption = value;
        pickMap.set(gameId, existingPick);
      }
    }
    else if (value !== "none")  {
      //New pick for this game
      var pick = {
        gameId: gameId,
        spreadPickOption: value,
        spreadPickPoints: 0,
        overUnderPickOption: null
      }
      pickMap.set(gameId, pick);
    }

    this.setState({ picks: pickMap });
  }

  handleOverUnderInputChange(event) {
    const target = event.target;
    const value = target.checked ? target.value : "none";
    const gameId = parseInt(target.name, 10);

    var pickMap = this.state.picks;
    var existingPick = pickMap.get(gameId);
    if (this.isDefined(existingPick)) {
      //Already have a pick for this game
      if (value === "none" && !this.isDefined(existingPick.spreadPickOption)) {
        //No picks for this game so remove the whole pick
        pickMap.delete(gameId);
      }
      else if (value === "none") {
        //Spread pick for this game so just remove over/under pick
        existingPick.overUnderPickOption = null;
        pickMap.set(gameId, existingPick);
      }
      else {
        //Adding a spread pick
        existingPick.overUnderPickOption = value;
        pickMap.set(gameId, existingPick);
      }
    }
    else if (value !== "none")  {
      //New pick for this game
      var pick = {
        gameId: gameId,
        spreadPickOption: null,
        spreadPickPoints: 0,
        overUnderPickOption: value
      }
      pickMap.set(gameId, pick);
    }

    this.setState({ picks: pickMap });
  }

  handleSpreadBetInputChange(event) {
    const target = event.target;
    const betValue = parseInt(target.value, 10);
    const gameId = parseInt(target.name, 10);

    var pickMap = this.state.picks;
    var existingPick = pickMap.get(gameId);
    if (this.isDefined(existingPick)) {
      existingPick.spreadPickPoints = betValue;
    }
    this.setState({ picks: pickMap });
  }


  /*
  Helpers
  */
  validatePicks() {
    return this.currentPickValueTotal() === 80 && this.overUnderPickCount("over") === 1  && this.overUnderPickCount("under") === 1;
  }

  isDefined(val) {
    return val !== null && val !== undefined && val !== "none";
  }

  pickValue(game) {
    if (!this.isDefined(this.state.picks.get(game.id))) {
      return 0;
    }
    else {
      return this.state.picks.get(game.id).spreadPickPoints
    }
  }

  pickValueEnabled(game) {
    return this.isDefined(this.state.picks.get(game.id)) && this.isDefined(this.state.picks.get(game.id).spreadPickOption);
  }

  currentPickValueTotal() {
    var pickMap = this.state.picks;

    var totalPickValues = 0;
    pickMap.forEach(function logMapElements(value, key, map) {
      totalPickValues += value.spreadPickPoints;
    })
    return totalPickValues;
  }

  overUnderPickCount(overUnder) {
    var pickMap = this.state.picks;

    var pickCount = 0;
    pickMap.forEach(function logMapElements(value, key, map) {
      if (value.overUnderPickOption === overUnder) {
        pickCount++;
      }
    })

    return pickCount;
  }

  formatSpread(spread, invert) {
    if (invert) {
      spread = -spread;
    }

    if (spread > 0) {
      return "+" + spread;
    }
    else {
      return "" + spread;
    }
  }

  render() {

    return (

      <div>
        <PageHeader headingText={"Week " + this.props.params.week} />

        <RealTimeScores />

        <table className="table table-striped">
          <thead>
            <tr>
              <th></th>
              <th>Home</th>
              <th></th>
              <th>Away</th>
              <th>Spread Points Bet</th>
              <th>Over/Under</th>
              <th>Over Bet</th>
              <th>Under Bet</th>
            </tr>
          </thead>
          <tbody>
            { this.state.games.map((game, index) => (
              <tr key={ game.id }>

                <td className="team_selector">
                  <input
                    name={ game.id }
                    value="home"
                    type="checkbox"
                    checked={this.state.picks.get(game.id) !== null && this.state.picks.get(game.id) !== undefined && this.state.picks.get(game.id).spreadPickOption === 'home'}
                    onChange={this.handleTeamInputChange} />
                </td>
                <td><TeamLogo team={ game.homeTeam} size={"small"}/> { game.homeTeam } ({this.formatSpread(game.spread, false)})</td>

                <td className="team_selector">
                  <input
                    name={ game.id }
                    value="away"
                    type="checkbox"
                    checked={this.state.picks.get(game.id) !== null && this.state.picks.get(game.id) !== undefined && this.state.picks.get(game.id).spreadPickOption === 'away'}
                    onChange={this.handleTeamInputChange} />
                </td>
                <td><TeamLogo team={ game.awayTeam} size={"small"}/> { game.awayTeam } ({this.formatSpread(game.spread, true)})</td>

                <td>
                  <input type="text"
                    name={ game.id }
                    value={this.pickValue(game)}
                    disabled={!this.pickValueEnabled(game)}
                    onChange={this.handleSpreadBetInputChange} />
                </td>

                <td>{ game.overUnder }</td>
                <td>
                  <input
                    name={ game.id }
                    value="over"
                    type="checkbox"
                    checked={this.state.picks.get(game.id) !== null && this.state.picks.get(game.id) !== undefined && this.state.picks.get(game.id).overUnderPickOption === 'over'}
                    onChange={this.handleOverUnderInputChange} />
                </td>
                <td>
                  <input
                    name={ game.id }
                    value="under"
                    type="checkbox"
                    checked={this.state.picks.get(game.id) !== null && this.state.picks.get(game.id) !== undefined && this.state.picks.get(game.id).overUnderPickOption === 'under'}
                    onChange={this.handleOverUnderInputChange} />
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        <div>
            <div><SuccessFailure success={this.currentPickValueTotal() === 80}/> Spread Points: {this.currentPickValueTotal()}</div>
            <div><SuccessFailure success={this.overUnderPickCount("over") === 1}/> Over Pick</div>
            <div><SuccessFailure success={this.overUnderPickCount("under") === 1}/> Under Pick</div>
        </div>

        <button className="btn btn-info log" disabled={!this.validatePicks()} onClick={this.savePicks}>Submit Picks</button>

      </div>
    );
  }
}

export default WeekGameList;
