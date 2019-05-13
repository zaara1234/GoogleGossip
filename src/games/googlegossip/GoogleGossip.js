import GameComponent from "../../GameComponent.js";
import React from "react";
import "./style.css";
import UserApi from "../../UserApi.js";
import Grid from "@material-ui/core/Grid";

export default class GoogleGossip extends GameComponent {
  constructor(props) {
    super(props);
    this.getSessionDatabaseRef().set({
      user_id: UserApi.getName(this.getMyUserId()),
      currentPlayer: "string",
      statements: ["statement 1", "statement 2", "statement 3"],
      truth: 0,
      guess: null,
      isLandingPage: true,
      isFormPage: false,
      isPickAnswerForm: false
    });
    this.state = {
      user_id: UserApi.getName(this.getMyUserId()),
      currentPlayer: "string",
      statements: ["statement 1", "statement 2", "statement 3"],
      truth: 0,
      guess: null,
      isLandingPage: true,
      isFormPage: false,
      isPickAnswerForm: false
    };
  }

  onSessionDataChanged(data) {
    // this.setState(data);
    console.log("Database has updated");
    console.log("dump of the DB");
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

  submitTea() {
    this.setState({
      isLandingPage: false,
      isFormPage: true
    });
  }

  landingPageRender() {
    return (
      <div class="main">
        <div id="drag" />
        <Grid container spacing={12}>
          <Grid item xs={4}>
            4
          </Grid>
          <Grid item xs={4}>
            <img
              alt="teacup"
              src="https://media0.giphy.com/media/8UHxg3Cn2A2kP74zrk/source.gif"
            />
          </Grid>
          <Grid item xs={4}>
            4
          </Grid>
          <Grid container spacing={12}>
            <Grid item xs={4}>
              4
            </Grid>
            <Grid item xs={4}>
              <button id="NewSession" onClick={() => this.submitTea()}>
                Submit Tea
              </button>
            </Grid>
            <Grid item xs={4}>
              4
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
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
  }

  handleFormSubmit(event) {
    // take the input from input0, input1, and input 2 --> override the "statements"
    // Take input from truthIdx --> override "truth"
    // [optional] error checking
    this.setState({
      currentPlayer: UserApi.getName(this.getMyUserId()),
      isLandingPage: false,
      isFormPage: false,
      isPickAnswerForm: true
    });

    // this.getSessionDatabaseRef().set(this.state);
  }

  handleFormChange(idx, event) {
    let newStatements = this.state.statements;
    newStatements[idx] = event.target.value;
    this.setState({
      statements: newStatements
    });
  }

  handleLieChange(event) {
    this.setState({
      truth: event.target.value
    });
  }

  submitAQuestionRender() {
    return (
      <form onSubmit={event => this.handleFormSubmit(event)}>
        <label for="input0">Truth or Lie #0</label>
        <br />
        <input
          type="text"
          value={this.state.statements[0]}
          onChange={event => this.handleFormChange(0, event)}
          required
        />
        <br />

        <label for="input1">Truth or Lie #1</label>
        <br />
        <input
          type="text"
          value={this.state.statements[1]}
          onChange={event => this.handleFormChange(1, event)}
          required
        />
        <br />

        <label for="input2">Truth or Lie #2</label>
        <br />
        <input
          type="text"
          value={this.state.statements[2]}
          onChange={event => this.handleFormChange(2, event)}
          required
        />
        <br />

        <label for="truthIdx">Index for Truth Statement</label>
        <br />
        <input
          type="text"
          value={this.state.truth}
          onChange={event => this.handleLieChange(event)}
          maxlength="1"
          required
        />
        <br />

        <input type="submit" value="Submit" />
      </form>
    );
  }

  render() {
    var id = this.getSessionId();
    // var users = this.getSessionUserIds().map(user_id => (
    //   <li key={user_id}>{UserApi.getName(user_id)}</li>
    // ));
    // var creator = UserApi.getName(this.getSessionCreatorUserId());
    // var me = UserApi.getName(this.getMyUserId());

    // isLandingPage: true,
    // isFormPage: false,
    // isPickAnswerForm: false,
    if (this.state.isLandingPage) {
      return this.landingPageRender();
    } else if (this.state.isFormPage) {
      return this.submitAQuestionRender();
    } else if (this.state.isPickAnswerForm) {
      return this.pickAnAnswerRender();
    }

    // if (me.includes("ZAARA")) {
    //   return this.submitAQuestionRender();
    // } else {
    //   return (
    //     <div>
    //       <p>Session ID: {id}</p>
    //       <p>Session creator: {creator}</p>
    //       <p>Session users:</p>
    //       <ul> {users} </ul>
    //     </div>
    //   );
    // }
  }
}
