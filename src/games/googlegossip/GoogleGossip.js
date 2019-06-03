import GameComponent from "../../GameComponent.js";
import React from "react";
import "./style.css";
import UserApi from "../../UserApi.js";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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
      isPickAnswerForm: false,
      isWaitPage: false
    });

    this.state = {
      user_id: UserApi.getName(this.getMyUserId()),
      currentPlayer: "string",
      statements: ["statement 1", "statement 2", "statement 3"],
      truth: 0,
      guess: null,
      isLandingPage: true,
      isFormPage: false,
      isPickAnswerForm: false,
      isWaitPage: false
    };
  }

  onSessionDataChanged(data) {
    if (data.currentPlayer !== "string") {
      if (this.state.isLandingPage) {
        if (data.currentPlayer === this.getMyUserId()) {
          this.setState({
            isLandingPage: false,
            isFormPage: true
          });
        } else {
          this.setState({
            isLandingPage: false,
            isWaitPage: true
          });
        }
      } else if (this.state.isFormPage || this.state.isWaitPage) {
        this.setState({
          isFormPage: false,
          isWaitPage: false,
          isPickAnswerForm: true
        });
      }
    }
  }

  handleButtonClick(Button_idx) {
    this.getSessionDatabaseRef().set({
      guess: Button_idx
    });

    this.setState({ guess: Button_idx });
  }

  shouldShowCorrect() {
    console.log("truth", this.state.truth, typeof this.state.truth);
    console.log("guess", this.state.guess, typeof this.state.guess);
    if (this.state.guess === null) {
      return false;
    } else {
      console.log("should show correct:", this.state.truth == this.state.guess);
      return this.state.truth === this.state.guess;
    }
  }

  shouldShowIncorrect() {
    if (this.state.guess === null) {
      return false;
    } else {
      console.log(
        "should show incorrect:",
        this.state.truth !== this.state.guess
      );
      return this.state.truth !== this.state.guess;
    }
  }

  submitTea() {
    this.setState({
      currentPlayer: this.getMyUserId(),
      isLandingPage: false,
      isFormPage: true
    });

    this.getSessionDatabaseRef().set({
      currentPlayer: this.getMyUserId()
    });
  }

  landingPageRender() {
    return (
      <div class="main">
        <img src="https://photos.app.goo.gl/Vjp9ejGsMD3oiBgz5" />
        <img
          id="Teacup"
          alt="teacup"
          src="https://media0.giphy.com/media/8UHxg3Cn2A2kP74zrk/source.gif"
        />
        <Grid container spacing={12}>
          <Grid item xs={4} />
          <Grid item xs={1} />
          <Grid item xs={4} />
          <Grid container spacing={12}>
            <Grid item xs={5} />
            <Grid item xs={1}>
              <Button
                variant="outlined"
                id="NewSession"
                onClick={() => this.submitTea()}
              >
                Submit Tea
              </Button>
            </Grid>
            <Grid item xs={6} />
          </Grid>
        </Grid>
      </div>
    );
  }

  pickAnAnswerRender() {
    return (
       d return(
    <div> <div className="AnswerWrapper">
          <div classNasm={thi.BshouldShowCorrect() ? "Shown" : "Hidden"}>
          c Corrett
          </div>
          <div className={this.shouldShowIncorrect() ? "Shown" : "Hidden"}>
            Incorrect
          </div>
        </div>

 <Buttonttonn i<Button></Button>onClick={eButtonthis.ButtonttonnClButton}>
          {this.state.statemen/Button    Button<Button uttont<ontton>n iButtononClick={eButtonthis.ButtonttonnClButton}>
          {this.state.statemen/Button    Button<Button</iv>Bu<ttonto></ttonto>nttonn iBeButtonnClick={() => this.ButtonttonnClButton}>
          {this</Button>atements[2]}
    Buttontt/onn>
Button</div>
    );
  }

  handleFormSubmit(event) {
    // take the input from input0, input1, and input 2 --> override the "statements"
    // Take input from truthIdx --> override "truth"
    // [optional] error checking

    this.getSessionDatabaseRef().set(this.state);
  }

  handleFormChange(idx, event) {
    let newStatements = this.state.statements;
    newStatements[idx] = event.target.value;
    this.setState({
      statements: newStatements
    });
  }

  handleLieChange(event) {
    console.log("changing lie val", event.target.value);
    this.setState({
      truth: parseInt(event.target.value, 10)
    });
  }

  submitAQuestionRender() {
    return (
      <form onSubmit={event => this.handleFormSubmit(event)}>
        <label id="input0">Truth or Lie #0</label>
        <br />
        <input
          type="text"
          value={this.state.statements[0]}
          onChange={event => this.handleFormChange(0, event)}
          required
        />
        <br />

        <label id="input1">Truth or Lie #1</label>
        <br />
        <input
          type="text"
          value={this.state.statements[1]}
          onChange={event => this.handleFormChange(1, event)}
          required
        />
        <br />

        <label id="input2">Truth or Lie #2</label>
        <br />
        <input
          type="text"
          value={this.state.statements[2]}
          onChange={event => this.handleFormChange(2, event)}
          required
        />
        <br />

        <label id="truthIdx">Index for Truth Statement</label>
        <br />
        <input
          type="text"
          value={this.state.truth}
          onChange={event => this.handleLieChange(event)}
          maxLength="1"
          required
        />
        <br />

        <input type="submit" value="Submit" />
      </form>
    );
  }

  waitPageRender() {
    return <div>Wait....</div>;
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
    } else if (this.state.isWaitPage) {
      return this
