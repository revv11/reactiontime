import './Reaction.css'
import React, {useEffect, useState} from 'react'

const backendurl = process.env.REACT_APP_BACKEND_URL;



export default function Standings(){

    const [tabledata, setData] = useState([{name:"", time:""}, {name:"", time:""}])
    

    async function gettabledata(){
        try{
            const res = await fetch(`${backendurl}/getall`,{
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            });
            const fetchdata = await res.json();
            setData(fetchdata.table);
            console.log({data:fetchdata.table})

        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        gettabledata();
    },[])


    return(
        <div className="leaderboard">
            <div className="leaderbox">
                    <h1>Standings</h1>
                    <div className="overflow">
                        <ul>
                            {tabledata.map((table, i)=>(
                              
                                    <li key={i}>P{i+1} {table.name}  {table.time}ms</li>
                               
                            ))}

                        </ul>
                    </div>
            </div>
            
        </div>
    )
}