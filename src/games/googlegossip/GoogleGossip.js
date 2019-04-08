import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";
import LandingPage from "./LandingPage.js";
import GamePage from "./GamePage.js";

export default class GoogleGossip extends GameComponent {
  render() {
    var id = this.getSessionId();
    var users = this.getSessionUserIds().map(user_id => (
      <li key={user_id}>{UserApi.getName(user_id)}</li>
    ));
    var creator = UserApi.getName(this.getSessionCreatorUserId());
    var me = UserApi.getName(this.getMyUserId());
    if (me.includes("Jermain")) {
      return <LandingPage />;
    } else if (me.includes("ZAARA")) {
      return <GamePage />;
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
