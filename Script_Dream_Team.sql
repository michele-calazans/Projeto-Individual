create database bdDreamTeam;

use bdDreamTeam;

create table tbUsuario(
idUsuario int primary key auto_increment,
user varchar(20),
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