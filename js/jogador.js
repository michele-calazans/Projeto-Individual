const express = require('express');
const connection = require('./database');
const router = express.Router();
let id_guarda = 0;
let nome_guarda = 0;
    
//Select dos jogadores cadastrados
//=================================================
//REcupera o idUsuario pelo parametro da rota
router.get('/recupera/:idUsuario/:nomeUsuario',(req, res) => {
    const idUsuario = req.params.idUsuario;
    const nomeUsuario = req.params.nomeUsuario;
    id_guarda = idUsuario;
    nome_guarda = nomeUsuario;
    res.redirect(`/enter`);

}); 
//=================================================
//Recupera os dados do jogador cadastrado
router.get('/enter',(req, res) => {
    var empty = "Nenhum jogador cadastrado"
    if(id_guarda == 0 || nome_guarda == 0){
        res.redirect('/');
    }else{
            // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
        let sql = `SELECT idJogador, nomeJogador, idade, nacionalidade, clube, selecao, nota, posicao, foto 
        FROM tbJogador where fk_user =  ${id_guarda}  group by idJogador desc`;
        connection.query(sql, (err, rows) => {
            if(err){
                throw err;
            }else if(rows.length>0){
                empty = "";
                res.render('init_index', {
                    jogadores : rows,
                    empty: empty,
                    nome: nome_guarda
                });
            }else{
                res.render('init_index', {
                    jogadores : rows,
                    empty: empty,
                    nome: nome_guarda
                });
            }
        
        });
    }
}); 
//=================================================
//Salva o jogador cadastrado no banco
router.post('/save',(req, res) => { 
    if(id_guarda == 0 || nome_guarda == 0){
        res.redirect('/');
    }else{
        let data = {
            nomeJogador: req.body.id_nome, 
            idade: req.body.id_idade, 
            nacionalidade: req.body.id_nacionalidade,
            clube: req.body.id_clube, 
            selecao: req.body.id_selecao, 
            nota: Number(req.body.ranking_nota),  
            posicao: req.body.position, 
            foto: req.body.id_foto,
            fk_user: id_guarda
        };
        let sql = `INSERT INTO tbJogador values(?,?,?,?,?,?,?,?,?,?)`;
        connection.query(sql, [null, data.nomeJogador, data.idade, 
        data.nacionalidade, data.clube, data.selecao, data.nota, data.posicao, data.foto, data.fk_user],(err, results) => {
        if(err) throw err;
        res.redirect(`/enter`);
        });
    }
});
//============================================
//Recupera os dados do jogador para o update 
router.get('/edit/:idJogador',(req, res) => {
    if(id_guarda == 0 || nome_guarda == 0){
        res.redirect('/');
    }else{
        const idJogador = req.params.idJogador;
        let sql = `Select * from tbJogador where idJogador = ${idJogador}`;
        connection.query(sql,(err, result) => {
            if(err) throw err;
            res.render('alter', {
                jogador : result[0]
            });
        });
    }   
});
//============================================
//Update do jogador cadastrado
router.post('/update',(req, res) => {
    if(id_guarda == 0 || nome_guarda == 0){
        res.redirect('/');
    }else{
    let sql = "";
    const Jogador = req.body.idJogador;
    //console.log(req.body.id_foto.length);

    if(req.body.id_foto.length>0){
        sql = `update tbJogador SET nomeJogador='${req.body.id_nome}',  idade='${req.body.id_idade}',  
               nacionalidade='${req.body.id_nacionalidade}', clube='${req.body.id_clube}',  
               selecao='${req.body.id_selecao}', nota='${req.body.ranking_nota}', posicao='${req.body.position}', 
               foto='${req.body.id_foto}' where idJogador = ${Jogador}`;
    }else{
        sql = `update tbJogador SET nomeJogador='${req.body.id_nome}',  idade='${req.body.id_idade}',  
               nacionalidade='${req.body.id_nacionalidade}', clube='${req.body.id_clube}',  
               selecao='${req.body.id_selecao}', nota='${req.body.ranking_nota}', posicao='${req.body.position}'
               where idJogador = ${Jogador}`;
    }
     
    connection.query(sql,(err, results) => {
        if(err) throw err;
        res.redirect(`/enter`);
        });
    }
});
//=============================================
//Delete do jogador cadastrado
router.get('/delete/:idJogador',(req, res) => {
    if(id_guarda == 0 || nome_guarda == 0){
        res.redirect('/');
    }else{
        const idJogador = req.params.idJogador;
        let sql = `DELETE from tbJogador where idJogador = ${idJogador} and fk_user = ${id_guarda}`;
        connection.query(sql,(err, result) => {
            if(err){
                throw err;
            }else{
                res.redirect(`/enter`);
            } 
        });
    }
});
//==========================================
//Dados do dashboard - subconsulta
router.get('/dashboard-rote',(req, res) => {
    if(id_guarda == 0 || nome_guarda == 0){
        res.redirect('/');
    }else{
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = `SELECT(SELECT avg(nota)FROM   tbJogador where fk_user = ${id_guarda}) AS media,
              (SELECT nomeJogador FROM   tbJogador where nota = (select max(nota) from tbJogador where fk_user = ${id_guarda}) 
               and fk_user = ${id_guarda} LIMIT 1) as nomeJogador,
              (SELECT selecao FROM tbJogador  where fk_user = ${id_guarda} GROUP BY  selecao ORDER BY COUNT(*) DESC LIMIT 1) as selecao,
              (SELECT posicao FROM tbJogador where fk_user = ${id_guarda} GROUP BY  posicao ORDER BY COUNT(*) DESC LIMIT 1) as posicao;`;

        connection.query(sql, (err, rows) => {
            if(err) throw err;
            res.render('dashboard', {
              favoritos : rows
            });
        });
    }
}); 
//=================================================
//Abre a tela de cadastro de jogador
router.get('/add',(req, res) => {
    if(id_guarda == 0 || nome_guarda == 0){
        res.redirect('/');
    }else{
        res.render('add-jogador');
    }
});
//===========================================
//Volta pra tela de inicio
router.get('/back-init',(req, res) => {
    if(id_guarda == 0 || nome_guarda == 0){
        res.redirect('/');
    }else{
     res.redirect('/enter');
    }
});
//===========================================
//Volta pra tela de login
router.get('/back-login',(req, res) => {
    id_guarda = 0;
    nome_guarda = 0;
    res.redirect('/');
});
//====================================================
module.exports = router;