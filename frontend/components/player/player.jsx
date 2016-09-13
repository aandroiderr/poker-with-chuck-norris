import React from 'react';
import PlayerTag from './player_tag';
import Hand from './hand';

class Player extends React.Component {

  constructor(props) {
    super(props);
  }

  getPlayerClass() {
    this.playerClass = `player player-${this.props.num}`;

    if (this.props.turn === this.props.num) {
      this.playerClass = `player player-${this.props.num} active`;
    }
  }

  aiMove() {
    if (this.props.turn === this.props.num) {
      this.props.call();
    }    
  }

  getCardClasses() {
    // debugger;
    let hand = this.props.player.hand;
    this.card1Class = `card ${hand[0].suit} rank${hand[0].rank}`
    this.card2Class = `card ${hand[1].suit} rank${hand[1].rank}`
  }

  render() {
    this.getPlayerClass();
    this.getCardClasses();
    // aiMove()
    
    let player = this.props.player;
    return(
      <li className={this.playerClass}>

        <div className="player-tag">
          <div className="player-stake">{player.stake}</div>
          <div className="player-info">
            <p className="player-name">John</p>
            <p className="player-worth">{player.bank}</p>
          </div>

          <img className="player-avatar" src="https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg" alt=""/>
        </div>

        <div className="player-hand">
          <div className={this.card1Class}>
            <div className="face"></div>
          </div>

          <div className={this.card2Class}>
            <div className="face"></div>
          </div>
        </div>        
      </li>
    )
        // <Hand />
  }
}

export default Player;