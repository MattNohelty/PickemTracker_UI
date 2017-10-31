import React, { Component } from 'react';

import Nav from './Nav';
import PageHeader from './PageHeader';
import TeamLogo from './TeamLogo';

import { getAllGamesForYearWeek } from '../service/GameService';
import { getUserPicksForYearWeek } from '../service/PickService';

class WeekGameList extends Component {

  constructor() {
    super()
    this.state = {
      games: [],
      picks: new Map()
    };

    this.handleTeamInputChange = this.handleTeamInputChange.bind(this);
    this.handleSpreadBetInputChange = this.handleSpreadBetInputChange.bind(this);
  }

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

  componentDidMount() {
    this.getGames();
    this.getPicks();
  }

  handleTeamInputChange(event) {
    console.log(this.state); //TODO

    const target = event.target;
    const value = target.checked ? target.value : "none";
    const gameId = parseInt(target.name);

    var pickMap = this.state.picks;
    var existingPick = pickMap.get(gameId);
    if (existingPick !== null && existingPick !== undefined) {
      //Already have a pick for this game
      if (value === "none" && existingPick.overUnderPickOption === "none") {
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

    console.log(this.state); //TODO
  }

  handleSpreadBetInputChange(event) {
    const target = event.target;
    const betValue = parseInt(target.value);
    const gameId = parseInt(target.name);

    var pickMap = this.state.picks;
    var existingPick = pickMap.get(gameId);
    if (existingPick !== null && existingPick !== undefined) {
      existingPick.spreadPickPoints = betValue;
    }
    this.setState({ picks: pickMap });
  }

  pickValue(game) {
    if (this.state.picks.get(game.id) === null || this.state.picks.get(game.id) === undefined) {
      return 0;
    }
    else {
      return this.state.picks.get(game.id).spreadPickPoints
    }
  }

  pickValueDisabled(game) {
    return this.state.picks.get(game.id) === null || this.state.picks.get(game.id) === undefined;
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
        <Nav />
        <PageHeader headingText={"Week " + this.props.params.week} />

        <table className="table table-striped">
          <thead>
            <tr>
              <th></th>
              <th>Home</th>
              <th></th>
              <th>Away</th>
              <th>Spread</th>
              <th>Over/Under</th>
              <th></th>
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
                <td>{ game.spread }</td>
                <td>{ game.overUnder }</td>
                <td>{ game.pick }</td>
                <td>
                  <input type="text"
                    name={ game.id }
                    value={this.pickValue(game)}
                    disabled={this.pickValueDisabled(game)}
                    onChange={this.handleSpreadBetInputChange} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    );
  }
}

export default WeekGameList;
