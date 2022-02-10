import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "688550271969-jqqvhm5snm36ao7cb1ijkrior1q0p847.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut(this.auth.currentUser.get().getId());
    }
  };

  onSignOut = () => {
    this.auth.signOut();
  };

  onSignIn = () => {
    this.auth.signIn();
  };

  renderAuth() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn === true) {
      return (
        <button className="ui button red google" onClick={this.onSignOut}>
          <i className="google icon"></i>Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui button red google" onClick={this.onSignIn}>
          <i className="google icon"></i>Sign In
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuth()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
