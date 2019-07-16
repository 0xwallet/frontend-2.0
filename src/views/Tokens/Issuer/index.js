import React,{useState} from 'react';
import { Button } from 'reactstrap'

export default ()=> {
    const [auth,setAuth] = useState(false);
    if(auth){
        return(
            <div>you have auth
            </div>
        )
    }else{
        return(
            <div>you should upGrade
                <Button onClick={()=>setAuth(true)} color="info">upGrade</Button>
            </div>
        )
    }
}