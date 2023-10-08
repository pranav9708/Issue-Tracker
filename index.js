const express=require('express');
const app =express();
const path = require('path');
const expressLayout = require('express-ejs-layouts')
const dotenv=require('dotenv').config();
const db=require('./config/db');
const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

const port=process.env.PORT || 8001;

//setting view part 
app.use(expressLayout);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.static('./assets'));

//sending routing request to routes
app.use('/',require('./routes'));

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})