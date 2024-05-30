require('dotenv').config()
const express = require('express');
const cors = require('cors');

const app = express();
const mongoose = require('mongoose');
const bookroutes = require('./routes/books')

app.use((req, res, next)=>{
    console.log( req.path, req.method)
    next()
})

app.use(express.json());
// app.use(cors({origin: ''}))

app.use('/api/books', bookroutes);

mongoose.connect(process.env.MONGO_URL)
.then(()=>{ 
    app.listen(process.env.PORT, ()=>{
        console.log('hello!', process.env.PORT)
    })  
}).catch((error)=>{ 
    console.log(error);
})



