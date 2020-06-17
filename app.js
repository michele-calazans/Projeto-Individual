const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
 
//set views file
app.set('views',path.join(__dirname,'views'));
 
//Resolveu o problema com o css
app.use(express.static("."));

//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Para linkar as 'classes'
app.use(require('./js/jogador'));
app.use(require('./js/usuario'));

// Server Listening
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});