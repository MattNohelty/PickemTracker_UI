import React, { Component } from 'react';
// import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Score from './Score';

class RealTimeScores extends Component {

  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
  }

  componentDidMount() {
    // var socket = new SockJS('/scores');
    var stompClient = Stomp.client('ws://localhost:9003/scores'); //TODO use proxy
    // stompClient = Stomp.over(socket);
    var component = this;
    stompClient.connect({}, function(frame) {
        console.log('Websocket connected');
        stompClient.subscribe('/topic/scores', function(messageOutput) {
            component.handleScoreUpdate(JSON.parse(messageOutput.body));
        });
    });
   }

  handleScoreUpdate(scoresArr) {
    this.setState({ games: scoresArr});
  }

  render() {
    return (
      <div>
      { this.state.games.map((score, index) => (
        <Score key={ score.game.id } score={ score } />
      ))}
      </div>
    );
  }
}

export default RealTimeScores;
