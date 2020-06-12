const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
 
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'13012001',
    database:'bdDreamTeam'
});
 
connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected!');
}); 
 
//set views file
app.set('views',path.join(__dirname,'views'));
 
//Resolveu o problema com o css
app.use(express.static("."));

//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 

//============================================
app.get('/',(req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = `SELECT idJogador, nomeJogador, idade, nacionalidade, clube, selecao, nota, posicao, fk_user, foto FROM tbJogador`;
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('init_index', {
            title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
            jogadores : rows
        });
    });
});
 

//============================================ Usar esse código para criar as rotas de voltar!!!!!!!!!!!!!!!!!
app.get('/add',(req, res) => {
    res.render('add-jogador', {
        title : 'CRUD Operation using NodeJS / ExpressJS / MySQL'
    });
});
 
//============================================
app.post('/save',(req, res) => { 
    let data = {nomeJogador: req.body.id_nome, idade: req.body.id_idade, nacionalidade: req.body.id_nacionalidade,
        clube: req.body.id_clube, selecao: req.body.id_selecao, nota: req.body.ranking_nota,  posicao: req.body.position, foto: req.body.id_foto};
    let sql = `INSERT INTO tbJogador SET ?`;
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});

//============================================
app.get('/edit/:idJogador',(req, res) => {
    const idJogador = req.params.idJogador;
    let sql = `Select * from tbJogador where idJogador = ${idJogador}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('alter', {
            title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
            jogador : result[0]
        });
    });
});


//============================================
app.post('/update',(req, res) => {
    const Jogador = req.body.idJogador;
    let sql = "update tbJogador SET nomeJogador='"+req.body.id_nome+"',  idade='"+req.body.id_idade+"',  nacionalidade='"+req.body.id_nacionalidade+"', clube='"+req.body.id_clube+"',  selecao='"+req.body.id_selecao+"',  nota='"+req.body.ranking_nota+"', posicao='"+req.body.position+"' where idJogador ="+Jogador;
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});
 


//=============================================
app.get('/delete/:idJogador',(req, res) => {
    const idJogador = req.params.idJogador;
    let sql = `DELETE from tbJogador where idJogador = ${idJogador}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/');
    });
});
 







// Server Listening
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});