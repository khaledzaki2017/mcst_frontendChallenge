import './index.css';
import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import {createStore} from 'redux';
import Cookies from 'js-cookie';
import Frame from './views/Frame';
import Login from './views/Login';
import Welcome from './views/Welcome';
import auth from './reducers/auth';
import {login} from './actions/auth';
let store = createStore(auth, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
class Base extends React.Component{
  constructor(props){
    super(props)   
    this.state = {
      showLogin: true,
      showWelcome: true
    } 
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.login){
      this.setState({showWelcome: false, showLogin: false});
    }else{
      this.setState({showWelcome: false, showLogin: true});      
    }
  }
  componentWillMount(){
    let token = Cookies.get("token");
    if(!token){
      this.setState({showWelcome: false})
      this.props.setlogin(false);
      return;
    }
    let data = {token: token};
    // ask the server if the token is valid
    fetch("http://localhost:3001/login", {method: "POST",
      body: JSON.stringify(data), 
      headers: new Headers({
      'Content-Type': 'application/json'})
      }).then(response => response.json()).then( res => {
      if(res.result === "true"){
        this.setState({showWelcome: false, showLogin: false});
        this.props.setlogin(true);        
      } else {
        this.setState({showWelcome: false, showLogin: true});
        this.props.setlogin(false);        
      }
    })
  }
  render(){
    return (<div style={{height: "100%"}}>
      {this.state.showWelcome? <Welcome/>: this.state.showLogin? <Login {...this.props}/>: <Frame {...this.props}/>}
    </div>)
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    login: state.login
  }
}
const mapDispatchToProps = dispatch => {
  return {
      setlogin: (flag) => {
          dispatch(login(flag))
      }
  }
}
const BaseContainer = connect(mapStateToProps, mapDispatchToProps)(Base);

document.getElementById('root').style.height = "100%";
ReactDOM.render(
  <Provider store={store}>
    <BaseContainer/>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
