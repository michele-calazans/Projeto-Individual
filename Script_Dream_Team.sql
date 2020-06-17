create database bdDreamTeam;

use bdDreamTeam;


 
use bdDreamTeam;
create table tbUsuario(
idUsuario int primary key auto_increment,
login varchar(20),
nome varchar(30),
pass_user varchar(20)
);



create table tbJogador(
idJogador int primary key auto_increment,
nomeJogador varchar(45),
idade int,
nacionalidade varchar(35),
clube varchar(35),
selecao varchar(35),
nota int,
posicao varchar(15),
foto varchar(50),
fk_user int,
foreign key (fk_user) references tbUsuario(idUsuario)
);


drop database bdDreamTeam;


insert into tbUsuario (login, nome, pass_user)
values 
('michele@', 'Michele', '123');


select * from tbUsuario;
 
select * from tbJogador where fk_user = 14;

select * from tbJogador where fk_user = 5;

select nome from tbJogador INNER JOIN tbUsuario on tbJogador.fk_user = tbUsuario.idUsuario where fk_user = 44
group by nome;

SELECT nome, idJogador, nomeJogador, idade, nacionalidade, clube, selecao, nota, posicao, foto 
FROM tbJogador INNER JOIN tbUsuario on tbJogador.fk_user = tbUsuario.idUsuario
where fk_user = 1  group by idJogador desc;

SELECT u.nome, idJogador, nomeJogador, idade, nacionalidade, clube, selecao, nota, posicao, foto 
    FROM tbJogador INNER JOIN tbUsuario  as u on tbJogador.fk_user = u.idUsuario
    where fk_user =  1 group by idJogador;
    
select b.nomeJogador, a.nota from tbJogador as b inner join tbJogador as a 
where b.nota = (select max(b.nota) from tbJogador) and a.fk_user = 1;


select avg(nota) as 'media', nomeJogador from tbJogador where fk_user = 1 and nota = (select max(nota) from tbJogador);

SELECT count(*) as NrVezes, selecao FROM tbJogador GROUP BY selecao ORDER BY NrVezes DESC;


SELECT count(*) as NrVezes, posicao FROM tbJogador where fk_user = 1 GROUP BY fk_user ORDER BY NrVezes DESC;

select nomeJogador from tbJogador where nota = (select max(nota) from tbJogador) and fk_user = 1;


desc tbUsuario;

SELECT avg(nota) as 'media'
from tbJogador 
where fk_user = 1  
 
UNION ALL
 
 

SELECT nomeJogador
from tbJogador 
where nota = (select max(nota) from tbJogador);

insert into tbJogador (nomeJogador, idade, nacionalidade, clube, selecao, nota, posicao, foto, fk_user)
values 
('Nishida Yuji', 20, 'Japônes', 'JTekt Stings', 'Japão', '9', 'Oposto', 'nishida', 2);


SELECT  
    (
    SELECT avg(nota)
    FROM   tbJogador where fk_user = 1
    ) AS media,
    (
    SELECT nomeJogador
    FROM   tbJogador where nota = (select max(nota) from tbJogador where fk_user = 1) and fk_user = 1
    LIMIT    1
    )as nomeJogador,
    (
	SELECT   selecao
    FROM     tbJogador  where fk_user = 1
    GROUP BY  selecao
    ORDER BY COUNT(*) DESC
    LIMIT    1
    )as selecao,
    (
	SELECT   posicao
    FROM     tbJogador where fk_user = 1
    GROUP BY  posicao
    ORDER BY COUNT(*) DESC
    LIMIT    1
    )as posicao;
    
    SELECT idJogador, nomeJogador, idade, nacionalidade, clube, selecao, nota, posicao, foto 
    FROM tbJogador where fk_user =  1  group by idJogador desc;
    
    
   
				SELECT(SELECT posicao FROM tbJogador 
					   where fk_user = 1
					   GROUP BY  posicao 
					   ORDER BY COUNT(*) 
					   DESC LIMIT 1)as posicao;
