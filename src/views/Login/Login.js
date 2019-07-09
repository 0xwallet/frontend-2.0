import React, { Component } from 'react';
import {connect} from 'react-redux';


class Login extends Component {
  constructor(){
    super();
    this.login = this.login.bind(this);
  }

  async login(){
    await this.props.changeInfo();
    if(this.props.info){
      this.props.history.push('/dashboard')
    }else{
       console.log('xxxxxx')
    }
  }

  render() {
    return (
      <div className="login">
        <h1 onClick={this.login}>{this.props.info}xxxxxxxxx</h1>
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