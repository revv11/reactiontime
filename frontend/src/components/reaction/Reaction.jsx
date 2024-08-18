import React, {useState, useEffect} from "react";
import {jwtDecode} from 'jwt-decode'
import Cookie from 'cookie-universal'
import './Reaction.css'
import Standings from "./Standings";
const cookies = Cookie();
const backendurl = process.env.REACT_APP_BACKEND_URL;

const Reaction = ()=>{
    const [best, setBest] = useState("")
    const [name , setName] = useState("")
    const [displayerr, setError] = useState("")
    const [id , setId] = useState("")
    const [endtime, setEndTime] = useState(0)
    const [starttime, setStartTime] = useState(0) 


    

    useEffect(() => {
        // Get a cookie
        if(cookies.get('jwt')){
            try{
                const token = cookies.get('jwt')
                const id = jwtDecode(token).id;
                setId(id);
                setRegister(false);

            }
            catch(err){
                console.log(err)
            }
        }
        
        
       


    
      }, []);

      async function updatetime(){
        try{
           
            
            if(endtime){
                const res = await fetch(`${backendurl}/time`,{
                    method: 'POST',
                    body: JSON.stringify({time:(endtime-starttime-55), id: id }),
                    headers: {'Content-Type': 'application/json'}
                });
                const data = await res.json();
                setBest(data.time);


            }  
            

        }
        catch(err){
            console.log(err)
        }
      }

      useEffect(() => {
        
        
        updatetime()

        

    
      }, [endtime]);

    async function handleSubmit(event){
        event.preventDefault()

        try{

            const res = await fetch(`${backendurl}/register`,{
                method: 'POST',
                body: JSON.stringify({name}),
                headers: {'Content-Type': 'application/json'}
            });
            const data = await res.json();
            console.log(data)
            if(data.error){
                setError(data.error);
            }
            else if(data.user){
                cookies.set('jwt', data.jwt, {path:'/', maxAge: 60*60*24*3})
                setId(data.user)
                setRegister(false)
            }

            
        }
        catch(err){
            console.log(err)
        }

        
    }


    //registercondition
    const[isRegister, setRegister] = useState(true)

    //rendering conditions
     
    const [istimer, setTimer] = useState(false)
    
    const [isfirst , setFirst] = useState(false)
    const [wrong, setWrong] = useState(false) 
    const [start, setStart] = useState(false)
    const [timerid, setTimerid] = useState(null);
        
    const State1 = ()=>{
        setFirst(true)
        setStart(true);   
        setStartTime(0);
        setEndTime(0);
        setWrong(false)
        let temp = setTimeout(function(){
            setStartTime(Date.now())
            setTimer(true)
        },Math.floor((Math.random() * 5) + 1)*1000)
       setTimerid(temp);
       
          

    }
    const State2 = ()=> {
        
        
            setEndTime(Date.now());
            setTimer(false);
            setStart(false);
            
            
           
        
        
    }
    const State3 = ()=>{
        clearTimeout(timerid);

        setStart(false);
        setWrong(true);
        setFirst(false);
        setTimer(false);
     
        
    }
   
    
    
    return(
        <div className="reaction" > 
            <div className="heading">
            <h1>REACTION TIME TEST</h1><br />
            <h1>{`(YOUR BEST ${best}ms) `} </h1>

            </div>
            {!istimer && !start && <div className="blue general" onClick={State1}>
            {isfirst && <p className="font">{`${endtime-starttime-55} ms`}</p>}
            {wrong && <p className="font">Too Soon</p>}
        
            <div className="font">Click To Start</div>
            </div>}
            {!istimer && start && <div onClick={State3} className="red general" >
                <div className="font" >Wait for Green</div>
            </div>}
            {istimer && start && <div className="green general" onClick={State2} >
                <div className="font">Click</div>
            </div>}
            
            <Standings/>


            {isRegister &&
            <div className="register">
                <div className="registerbox">
                    <h1>Register</h1>

                    <form action="POST">
                        <input className="inputbox" onChange={(event)=>{setName(event.target.value)}} required="true" type="text" placeholder="Enter your name" />
                        {displayerr && <div>{displayerr}</div>}
                        <button className="submit" type="submit" onClick={handleSubmit}>Submit</button>
                    </form>

                </div>

            </div>
            }
        </div>
    )
}

export default Reaction;