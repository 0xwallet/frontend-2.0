import React,{ PureComponent } from 'react';
import { connect } from 'react-redux';

 class Management extends PureComponent{
    render(){
        console.log(this.props.auth,'test')
        return this.props.auth ? <div>you have auth</div> : 
        <div>you no auth</div>
    }
}

function mapStateToProps(state){
    return{
      auth : state.upgrade.auth
    }
  }
  
export default connect(mapStateToProps)(Management)