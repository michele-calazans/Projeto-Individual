create database bdDreamTeam;

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
nota varchar(2),
posicao varchar(15),
foto varchar(50),
fk_user int,
foreign key (fk_user) references tbUsuario(idUsuario)
);

insert into tbUsuario (login, nome, pass_user)
values 
('michele@', 'Michele', '123');


insert into tbJogador (nomeJogador,
idade,
nacionalidade,
clube,
selecao,
nota,
posicao,
foto,
fk_user)
values 
('Nishida Yuji', 20, 'Japônes', 'JTekt Stings', 'Japão', '9', 'Oposto', 'nishida');