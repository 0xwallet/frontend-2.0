import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios'

import Viewer from './Viewer';
import './Login.scss'

// axios.interceptors.request.use((config)=>{
//     config.url = 'http://owaf.io/v2api' + config.url
//     return config;
// })

class Login extends Component {
  constructor(){
    super();
    this.register = this.register.bind(this);
    this.sendAgain = this.sendAgain.bind(this);
    this.state = {
      count  : 60
    }
  }

  register(e){
    e.preventDefault()
    const that = this;
    var form=document.querySelector('#login');
    const formdata = new FormData(form);
    if(this.props.info === false){
      axios.get('https://owaf.io/v2api/get_auth_code', {   
        params : {
          email : formdata.get('email'),  
        }
      })
      .then(function (response) {
        if(response.status === 200){
          that.tick();
          that.props.changeInfo(true)// send youjian go login
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    if(this.props.info === true){
      axios.get('https://owaf.io/v2api/verify_auth_code', {   
        params : {
          email : formdata.get('email'),  
          code : formdata.get('verification')
        }
      })
      .then(function ({data : {r}}) {
        if(r === 'ok'){
          that.props.changeToLogin(true);
          that.props.changeSendMsg(false);
          that.props.history.push('/dashboard')// yanzheng to home
        }else{
          that.props.changeSendMsg(true); // send again
          that.props.changeInfo(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  sendAgain(){
    var form=document.querySelector('#login');
    const formdata = new FormData(form);
    const that = this;
    axios.get('https://owaf.io/v2api/get_auth_code', {   
      params : {
        email : formdata.get('email'),  
      }
    })
    .then(function ({data : {r}}) {
      that.props.changeInfo(true);
      that.setState({
        count : 60,
      },()=>{
        that.tick()
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  tick = ()=>{
    this.timer = setInterval(()=>{
      this.setState({
        count : this.state.count - 1
      },()=>{
        if(this.state.count === 0){
          clearInterval(this.timer);
        }
      })
    },1000)
  }

  render() {
    const props = {
      register : this.register,
      toLogin : this.props.info,
      sendMessage : this.props.sendMessage,
      sendAgain : this.sendAgain,
      count : this.state.count
    }

    return (
      <div className="login">
        <Viewer {...props}/>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    info : state.login.info,
    sendMessage : state.login.sendAgain
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeInfo : (info)=> dispatch({type : "login",payload : { info }}),
    changeSendMsg : (info)=> dispatch({type : "sendAgain",payload : { sendAgain : info }}),
    changeToLogin : (info)=> dispatch({type : "tologin",payload : { tologin : info }}),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);