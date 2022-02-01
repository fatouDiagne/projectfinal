create table etudiant(
    idEtu int primary key auto_increment,
    firstName varchar(30),
    lastName varchar(30),
    dateNaissance varchar(50),
    note1 float,
    note2 float,
    moyenne float
);

create table prof(
    idProf int primary key auto_increment,
    email varchar(50),
    password varchar(50)
);