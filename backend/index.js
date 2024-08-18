const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const router = require('./routes/routes')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config();



const app = express();
app.use(cors({credentials:true}))
app.use(bodyParser.json());

const PORT = 4000;

app.use(router)



app.listen(PORT, async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Server is running on port ${PORT}`);
    }
    catch(err){
        console.log(err)
    }
});

app.get('/',(req, res) => {
    res.json({message: "Backend working properly"})
})