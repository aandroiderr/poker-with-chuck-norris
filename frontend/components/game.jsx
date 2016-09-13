import React from 'react';
import Player from './player/player';
import Stage from './stage/stage';
import Interface from './interface/interface';
import { deck } from '../util/deck';
import shuffle from 'lodash/shuffle';
import merge from 'lodash/merge';


class Game extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pot: 0,
      deck: deck,
      round: 'pre-round',
      dealer: 1,
      turn: 2,
      players: {
        "1": {
          hand: [{
            suit: '',
            rank: ''
          },{
            suit: '',
            rank: ''
          }],
          bank: 1000,
          stake: 0
        },
        "2": {
          hand: [{
            suit: '',
            rank: ''
          },{
            suit: '',
            rank: ''
          }],
          bank: 1000,
          stake: 0
        }
      }
    };
  }

  // pre-round
  // pre-flop
  // flop
  // turn
  // river

  deal() {
    let deck = shuffle(this.state.deck);
    let cardsToDeal = deck.splice(48);
    
    let player1Hand = cardsToDeal.slice(0, 2);
    let player2Hand  = cardsToDeal.slice(2);

    this.setState({
      deck: deck,
      players: {
        '1': {
          bank: this.state.players['1'].bank,
          stake: this.state.players['1'].stake,
          hand: player1Hand,
        },
        '2': {
          bank: this.state.players['2'].bank,
          stake: this.state.players['2'].stake,
          hand: player2Hand
        }
      },
      round: 'pre-flop'
    }, this.collectAntes);
  }

  collectAntes() {
    let dealer = String(this.state.dealer);
    let smallAntePlayerIdx = (this.state.dealer + 1);
    let bigAntePlayerIdx = (this.state.dealer + 2);

    if (smallAntePlayerIdx > 2) {
      smallAntePlayerIdx = String(smallAntePlayerIdx % 2);
    }
    if (bigAntePlayerIdx > 2) {
      bigAntePlayerIdx = String(bigAntePlayerIdx % 2);
    }

    let smallAntesBank = this.state.players[smallAntePlayerIdx].bank - 25;
    let bigAntesBank = this.state.players[bigAntePlayerIdx].bank - 50;

    this.setState({
      players: {
        [smallAntePlayerIdx]: { 
          bank: smallAntesBank,
          stake: 25,
          hand: this.state.players[smallAntePlayerIdx].hand
        },
        [bigAntePlayerIdx]: {
          bank: bigAntesBank,
          stake: 50,
          hand: this.state.players[bigAntePlayerIdx].hand               
        }
      },
      round: 'pre-flop'
    }, this.getBets);
  }

  getBet() {
    let i = 0
    while (this.state.players['1'].stake !== this.state.players['2'].stake && i < 2) {
      
      i++;
    }
  }

  setPlayer() {
    //dynamically output players
  }

  render() {
    window.state = this.state;
    return(
      <div className="game">
        <ul className="players">
          <Player 
            num={1}
            round={this.state.round}
            player={ this.state.players["1"] } />
          <Player
            num={2}
            round={this.state.round}
            player={ this.state.players["2"] } />
        </ul>

        <Stage />

        <Interface 
          deal={this.deal.bind(this)} 
          round={this.state.round}
          turn={this.state.turn}
          />
      </div>
    );
  }
}

export default Game;