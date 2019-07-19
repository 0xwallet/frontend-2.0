import React,{PureComponent} from 'react';
import { Button } from 'reactstrap';
import './index.scss'

export default class Model extends PureComponent{
    render(){
        const { height,width,visibility,title = "title", } = this.props;

        const modalBodyStyle = {
            height,
            width,
            display : visibility ? 'flex' : 'none'
        }

        const maskstyle = {
            display : visibility ? 'flex' : 'none'
        }

        return(
            <>
                <div className="mask" style={maskstyle}></div>
                <div className="model" style={modalBodyStyle}>
                    <header>{title}
                        <span className="close" onClick={this.props.onCancel}>
                            <i className="fa fa-close"></i>
                        </span>
                    </header>
                    <section>
                        {this.props.children}
                    </section>  
                    <footer>
                        <Button color="light" onClick={this.props.onCancel}>Cancel</Button>
                        <Button color="primary" onClick={this.props.onOk}>OK</Button>
                    </footer>
                </div>
            </>
        )
    }
}