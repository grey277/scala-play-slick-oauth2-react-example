/*global FB*/
import React, {Component} from 'react';
import FacebookReduxLogin from 'facebook-login-redux-react';
import {Header} from './Header'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getLoginStatus, startFetching, getUserInformation} from '../actions.js';
import Well from './well.jsx';
import ListItem from './listItem.jsx';
import Mail from '../style/mail.svg';
import Name from '../style/face.svg';
import Id from '../style/id.svg';
import Spinner from './spinner.jsx';
import Icon from '../style/icon.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this
      .login
      .bind(this);
    this.logout = this
      .logout
      .bind(this);
    this.getUserInformation = this
      .getUserInformation
      .bind(this);
    this.sdkLoaded = this
      .sdkLoaded
      .bind(this);
    this.styles = {};

  }

  login(response) {
    this
      .props
      .getLoginStatus(response.status);
  }
  sdkLoaded(payload) {
    this
      .props
      .getLoginStatus(payload);
  }
  logout(response) {
    this
      .props
      .getLoginStatus(response.status);
    this
      .props
      .getUserInformation(null);
  }
  getUserInformation() {
    if (this.props.facebookLogin.isConnected && !this.props.userInformation) {
      FB.api('/me', 'GET', {
        fields: 'id,name,email'
      }, userInformation => {
        this
          .props
          .getUserInformation(userInformation);
      });
    }
    if (!this.props.userInformation) {
      console.log("No user information");
    }
  }
  render() {
    const {id, name, email} = this.props.userInformation || {
      id: null,
      name: null,
      email: null
    };
    this.getUserInformation();
    return (
      <div style={styles.container}>
        <Header isLoggedin={this.props.userInformation}/>
        <FacebookReduxLogin
          appId="237143130203551"
          sdkLoaded={this.sdkLoaded}
          onLoginEvent={this.login}
          onLogoutEvent={this.logout}
          onClick={() => this.props.startFetching()}>
          <ButtonIndicator isWorking={this.props.facebookLogin.isWorking}/>
        </FacebookReduxLogin>
        <Well isDisplayed={this.props.userInformation}>
          <ListItem text={id} svg={Id}/>
          <ListItem text={name} svg={Name}/>
          <ListItem text={email} svg={Mail}/>
        </Well>
      </div>
    );
  }
}

const ButtonIndicator = ({isWorking}) => {
  const style = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 34,
    height: '100%',
    background: 'url(' + Icon + ') 6px 6px no-repeat'
  };
  if (isWorking) 
    return <Spinner/>;
  return <div style={style}/>;
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getLoginStatus,
    startFetching,
    getUserInformation
  }, dispatch);
}
function mapStateToProps(state) {
  return {userInformation: state.userInformation, facebookLogin: state.facebookLogin};
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}