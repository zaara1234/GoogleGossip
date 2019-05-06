import GameComponent from "../../GameComponent.js";
import React from "react";
import "./style.css";
import UserApi from "../../UserApi.js";
import LandingPage from "./LandingPage.js";
import GamePage from "./GamePage.js";

export default class GoogleGossip extends GameComponent {
  constructor(props) {
    super(props);
    this.getSessionDatabaseRef().set({
      user_id: UserApi.getName(this.getMyUserId()),
      button_clicked: 0,
      currentPlayer: "string",
      statements: ["statement 1", "statement 2", "statement 3"],
      truth: 0,
      guess: null
    });
    this.state = {
      user_id: UserApi.getName(this.getMyUserId()),
      button_clicked: 0,
      currentPlayer: "string",
      statements: ["statement 1", "statement 2", "statement 3"],
      truth: 0,
      guess: null
    };
  }
  onSessionDataChanged(data) {
    console.log(data);
  }

  handleButtonClick(button_idx) {
    this.getSessionDatabaseRef().set({
      guess: button_idx
    });

    this.setState({ guess: button_idx });
  }

  shouldShowCorrect() {
    if (this.state.guess === null) {
      return false;
    } else {
      return this.state.truth === this.state.guess;
    }
  }

  shouldShowIncorrect() {
    if (this.state.guess === null) {
      return false;
    } else {
      return this.state.truth !== this.state.guess;
    }
  }

  pickAnAnswerRender() {
    return (
      <div>
        <div className="AnswerWrapper">
          <div className={this.shouldShowCorrect() ? "Shown" : "Hidden"}>
            Correct
          </div>
          <div className={this.shouldShowIncorrect() ? "Shown" : "Hidden"}>
            Incorrect
          </div>
        </div>

        <button id="0" onClick={() => this.handleButtonClick(0)}>
          {this.state.statements[0]}
        </button>
        <button id="1" onClick={() => this.handleButtonClick(1)}>
          {this.state.statements[1]}
        </button>
        <button id="2" onClick={() => this.handleButtonClick(2)}>
          {this.state.statements[2]}
        </button>
      </div>
    );
    //<div onClick={() => this.handleButtonClick()}>Click Me!</div>;
  }

  submitAQuestionRender() {
    return <div />;
  }

  render() {
    var id = this.getSessionId();
    // var users = this.getSessionUserIds().map(user_id => (
    //   <li key={user_id}>{UserApi.getName(user_id)}</li>
    // ));
    var creator = UserApi.getName(this.getSessionCreatorUserId());
    var me = UserApi.getName(this.getMyUserId());
    if (me.includes("Jermain")) {
      return <LandingPage />;
    } else if (me.includes("ZAARA")) {
      return this.submitAQuestionRender();
    } else {
      return (
        <div>
          <p>Session ID: {id}</p>
          <p>Session creator: {creator}</p>
          <p>Session users:</p>
          <ul> {users} </ul>
        </div>
      );
    }
  }
}
