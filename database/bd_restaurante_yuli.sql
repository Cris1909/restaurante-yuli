DROP DATABASE IF EXISTS bdrestaurante_yuli;

-- Creando BD
CREATE database bdrestaurante_yuli ENCODING='UTF8';
-- Conectar BD
\c bdrestaurante_yuli
-- Creación de tablas

-- TMSTATUS

CREATE TABLE tmstatus(
    cods INTEGER not null primary key,
    dstatus varchar(12) not null
);

insert into tmstatus(cods, dstatus) VALUES
(0, 'ELIMINADO'),
(1, 'ACTIVO'),
(2, 'DESACTIVADO'),
(3, 'PENDIENTE'),
(4, 'ENTREGADO')
(5, 'PAGADO')
(6, 'CANCELADO');

SELECT * FROM tmstatus;

CREATE TABLE tmcargos(
    cod_car INTEGER not null primary key,
    dcar varchar(30) not null
);

insert into tmcargos(cod_car, dcar) VALUES
(0, 'Super Admin'),
(1, 'Admin'),
(2, 'Cocinera Jefe'),
(3, 'Cocinera'),
(4, 'Mesera');

SELECT * FROM tmcargos;

CREATE TABLE tmusuarios(
    ced_user varchar(12) not null primary key,
    nom_user varchar(100) not null,
    email_user varchar(100) not null,
    password_user varchar(100) not null,
    fkcod_car_user integer not null,
    fkcods_user integer not null default 1,
    foreign key(fkcod_car_user) references tmcargos(cod_car) on update cascade on delete restrict,
    foreign key(fkcods_user) references tmstatus(cods) on update cascade on delete restrict
);

insert into tmusuarios(ced_user, nom_user, email_user, password_user, fkcod_car_user) VALUES
('88220270', 'Luis Barrera', 'luisbarrera31@hotmail.com', 'luisbarrera31', 0),
('1004997175', 'Merly Barrera', 'merly1004@hotmail.com', 'merly1004', 1),
('123456789', 'Erika Martinez', 'erika123@hotmail.com', 'erika123', 2),
('6754355', 'Raquel Medina', 'raquel123@hotmail.com', 'raquel123', 3),
('0987655432', 'Keyla Rangel', 'keylamaria@gmail.com', 'keylamaria', 3),
('928923', 'Zoreidis Lopez', 'zoreidis123@gmail.com', 'zoreidis123', 4),
('8877654', 'Mery Perez', 'mery9876@gmail.com', 'mery9876', 4);

SELECT * FROM tmusuarios;

CREATE TABLE tmtipo_clientes(
    cod_tc integer not null primary key,
    dtipo_cliente varchar(30) not null
);

insert into tmtipo_clientes(cod_tc, dtipo_cliente) VALUES
(0, 'Asociacion'),
(1, 'Terminal'),
(2, 'Pasajero');

SELECT * FROM tmtipo_clientes;

CREATE TABLE tmproductos(
    cod_prod SERIAL not null primary key,
    nom_prod varchar(100) not null,
    dprod varchar(200) not null,
    precio_base DOUBLE PRECISION not null,
    img_prod varchar not null,
    fkcods_prod integer not null default 1,
    foreign key(fkcods_prod) references tmstatus(cods) on update cascade on delete restrict 
);

insert into tmproductos(nom_prod, dprod, precio_base, img_prod) VALUES
('Lengua Guisada', 'Delicioso plato corriente de lengua guisada, con principio del día, arroz, tajadas de maduro y ensalada', 10000, 'restaurante_yuli/l6k95m0zl9hdfo2vugnl'),
('Carne a la plancha', 'Almuerzo corriente con Carne a la plancha que contiene: Arroz, principio del día, tajadas de maduro y ensalada', 10000, 'restaurante_yuli/etejlxuklp31ruhkhie4'),
('Arroz con pollo', 'Delicioso arroz con pollo con papa criolla frita', 15000, 'restaurante_yuli/uoujnyfubttwungbmjaf'),
('Bandeja Paisa', 'Bandeja paisa con todos sus ingredientes: Frijoles, Arroz, Carne Molida, Chicharron, Aguacate, Huevo frito, Longaniza, Tajadas de maduro y Arepa', 16000, 'restaurante_yuli/damh0hvgfp0b4mseqhwj'),
('Arroz Mixto', 'Arroz mixto de 5 tipos de carnes: Carne de res, carne de cerdo, chuleta ahumada, pechuga y camarones, verduras, raices chinas y acompañado con papas a la francesa', 16000, 'restaurante_yuli/sk5sfkdprxlmn9w4gueb');

SELECT * FROM tmproductos;

CREATE TABLE tmrecargos(
    cod_rec SERIAL not null primary key,
    recargo_cliente DOUBLE PRECISION not null,
    fkcod_prod_rec integer not null,
    fkcod_tc_rec integer not null,
    foreign key(fkcod_prod_rec) references tmproductos(cod_prod) on update cascade on delete restrict,
    foreign key(fkcod_tc_rec) references tmtipo_clientes(cod_tc) on update cascade on delete restrict
);

insert into tmrecargos(fkcod_prod_rec, fkcod_tc_rec, recargo_cliente) VALUES
(1, 0, 1000),
(1, 1, 2000),
(1, 2, 6000),
(2, 0, 1000),
(2, 1, 2000),
(2, 2, 6000);

SELECT * FROM tmrecargos;

CREATE TABLE tdfactura (
    cod_fac SERIAL not null primary key,
    monto_total DOUBLE PRECISION not null,
    fecha_fac date not null default CURRENT_DATE,
    hora_fac time not null default CURRENT_TIME,
    obs_fac varchar(500) not null,
    fktc_fac integer not null,
    fkced_vendedor varchar(12) not null,
    fkcods_fac integer not null default 1,
    foreign key(fktc_fac) references tmtipo_clientes(cod_tc) on update cascade on delete restrict,
    foreign key(fkced_vendedor) references tmusuarios(ced_user) on update cascade on delete restrict,
    foreign key(fkcods_fac) references tmstatus(cods) on update cascade on delete restrict 
);

SELECT * FROM tdfactura;

CREATE TABLE tddfactura(
    cod_dfac SERIAL not null primary key,
    cantidad_platos integer not null,
    precio_base DOUBLE PRECISION not null,
    recargo_clie DOUBLE PRECISION not null,
    fkcod_prod_dfac integer not null,
    fkcod_fac_dfac integer not null,
    fkcods_dfac integer not null default 1,
    foreign key(fkcod_prod_dfac) references tmproductos(cod_prod) on update cascade on delete restrict,
    foreign key(fkcod_fac_dfac) references tdfactura(cod_fac) on update cascade on delete restrict,
    foreign key(fkcods_dfac) references tmstatus(cods) on update cascade on delete restrict
);

SELECT * FROM tddfactura;
