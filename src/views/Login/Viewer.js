import React from 'react';
import {Link} from 'react-router-dom';
import {Button,Input,Form,InputGroup,InputGroupAddon,InputGroupText} from 'reactstrap'

import './Viewer.scss'

import imgUrl from '../../assets/img/brand/logo.jpg';

export default (props)=>{
    return(
        <div className={props.toLogin? "viewer tologin" : "viewer"}>
            <div className="logo">
                <img src={imgUrl} alt="logo"></img>
                <h2 style={{textAlign : 'center'}}>OxAuth</h2>
            </div>

            {
                props.toLogin ? <div style={{color : "#73818f"}}>Hello Guest!</div> : ""
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
                    <Link to="/webAuthn" style={{float : 'right'}}>WebAuthn</Link>
                </div>
            </Form>

        </div>
    )
}