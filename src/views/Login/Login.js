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
    this.state = {
      toLogin : false
    }
    this.register = this.register.bind(this);
  }
  register(e){
    e.preventDefault()
    const that = this;
    var form=document.querySelector('#login');
    const formdata = new FormData(form);
    if(this.state.toLogin === false){
      axios.get('https://owaf.io/v2api/get_auth_code', {   
        params : {
          email : formdata.get('email'),  
        }
      })
      .then(function (response) {
        if(response.status === 200){
          that.setState({
            toLogin : true
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }else{
      axios.get('https://owaf.io/v2api/verify_auth_code', {   
        params : {
          email : formdata.get('email'),  
          code : '12345'
        }
      })
      .then(function (response) {
        if(response.status === 200){
          that.props.changeInfo();
          that.props.history.push('/dashboard')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  render() {
    const props = {
      register : this.register,
      toLogin : this.state.toLogin
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
    info : state.login.info
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    changeInfo : ()=> dispatch({type : "login",payload : {info : true }})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);