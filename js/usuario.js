const express = require('express');
const connection = require('./database');
const router = express.Router();
let idUsuario = 0;
let nomeUsuario = "";
// Tela inicial
router.get('/',(req, res) => {
    res.render('login', {
            title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
    });
});
//==================================================
//Abre a tela de cadastro de usuário
router.get('/add-usuario',(req, res) => {
    res.render('add-user', {
        title : 'CRUD Operation using NodeJS / ExpressJS / MySQL'
    });
});
//======================================================
//Recupera os dados do usuário cadastrado
router.post('/autenticar',(req, res) => {
    const login = req.body.id_user;
    const pass = req.body.id_pass;
    let sql = `Select * from tbUsuario where login = '${login}' and pass_user = '${pass}'`;
    let query = connection.query(sql,(err, result) => {
        if(err){
            throw err;
        }else if(result.length > 0){
            idUsuario = result[0].idUsuario;
            nomeUsuario = result[0].nome;
            res.redirect(`/recupera/${idUsuario}/${nomeUsuario}`);
            // console.log("Id: "+idUsuario);
            // console.log("Nome: "+nomeUsuario);
        }else{
            var erros = "Login ou senha incorretos"
            res.render('login', {
                erros: erros
           })
        }
    });
});
//=======================================================
//Salva o dados usuário
router.post('/save_user',(req, res) => { 
        let data = {
            login: req.body.id_user, 
            nome: req.body.id_name_user, 
            pass_user: req.body.id_pass
        };

        let sql = `INSERT INTO tbUsuario SET ?`;
        
        let query = connection.query(sql, data,(err, results) => {
        if(err) throw err;
          res.redirect('/max_user');
        });
});
//====================================================
//Recupera os dados do último usuário cadastrado
router.get('/max_user',(req, res) => {
    let sql = `Select idUsuario, nome
               from tbUsuario where idUsuario = (select max(idUsuario) from tbUsuario) `;
    let query = connection.query(sql,(err, result) => {
        if(err){
            throw err;
        }else if(result.length > 0){
            idUsuario = result[0].idUsuario;
            nomeUsuario = result[0].nome;
            res.redirect(`/recupera/${idUsuario}/${nomeUsuario}`);
            //console.log(result[0].idUsuario);
        }
    });
});












module.exports = router;