import React from 'react';
import {Button,Input,Form,InputGroup,InputGroupAddon,InputGroupText} from 'reactstrap'

import './Viewer.scss'

import imgUrl from '../../assets/img/brand/logo.jpg';

export default (props)=>{
    return(
        <div className={props.toLogin? "viewer tologin" : "viewer"}>
            <div className="logo">
                <img src={imgUrl} alt="logo"></img>
                <h2 style={{textAlign : 'center'}}>0xAuth</h2>
            </div>

            {
                props.sendMessage && !props.toLogin? <div style={{color : "#73818f"}}>Wrong Code!</div> : ""
            }

            {
                props.toLogin  ? <div style={{color : "#73818f"}}>Hello Guest!</div> : ""
            }
            
            <Form row="true" onSubmit={props.register} id="login">
                <InputGroup style={{margin : '1.3rem 0'}}>
                    <InputGroupAddon addonType="append">
                        <InputGroupText>
                            <i className="fa fa-envelope-o"></i>
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input type="email" id="email" name="email" placeholder="Email" />            
                </InputGroup>
                {
                    props.toLogin ?   <InputGroup>
                    <InputGroupAddon addonType="append">
                      <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" id="text" name="verification" placeholder="Verification Code" autoComplete="current-password"/>
                  </InputGroup>: ""
                }
                <div style={{marginTop : '1.3rem'}}>
                    <Button color="primary" style={{width : "100%"}} type="submit">{
                        !props.toLogin ? 'Enter' : 'Sign Up'
                    }</Button>
                </div> 
                <div style={{marginTop : "1.3rem",width : "100%"}}>
                     {
                         xx(props.toLogin,props.sendAgain,props.count,props.sendMessage)
                     }
                    <a  style={{float : 'right'}} href="xx">WebAuthn</a>
                </div>
            </Form>

        </div>
    )
}

function xx(msg,fn,count,sendMessage){
    if(msg){
        if(count === 0){
            return <a  style={{float : 'left',color : "#20a8d8"}} href="xx" onClick={fn}>Resend</a>
        }else{
            return <p style={{float : 'left'}}>{`${count}s`}</p>
        }
    }else{
        if(sendMessage){
            if(count !== 0 ){
                 return <p style={{float : 'left'}}>{`${count}s`}</p>
            }else{
                 return <a  style={{float : 'left',color : "#20a8d8"}} href="xx" onClick={fn}>Resend</a>                 
            }
        }
        return ""
    }
}