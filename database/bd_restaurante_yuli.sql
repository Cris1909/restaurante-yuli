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
(4, 'ENTREGADO'),
(5, 'PAGADO'),
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
    obs_fac varchar(500),
    nom_cliente varchar(100),
    mesa_fac integer,
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

CREATE TABLE tmgastos_fijos(
    cod_gf SERIAL not null primary key,
    salarios DOUBLE PRECISION not null,
    arriendo DOUBLE PRECISION not null,
    gas DOUBLE PRECISION not null,
    servicios DOUBLE PRECISION not null,
    vehiculo DOUBLE PRECISION not null,
    banco DOUBLE PRECISION not null
);

INSERT INTO tmgastos_fijos(salarios, arriendo, gas, servicios, vehiculo, banco) VALUES
(290000, 41500, 34000, 30000, 35000, 10000);

SELECT * FROM tmgastos_fijos;

CREATE TABLE tmreporte_diario(
    cod_rd SERIAL not null primary key,
    fecha_rd date not null unique default CURRENT_DATE,
    -- Gastos de inversión
    compras_rd DOUBLE PRECISION not null default 0,
    varios_rd DOUBLE PRECISION not null default 0,
    -- Gastos operativos
    salarios_rd DOUBLE PRECISION not null,
    arriendo_rd DOUBLE PRECISION not null,
    gas_rd DOUBLE PRECISION not null,
    servicios_rd DOUBLE PRECISION not null,
    vehiculo_rd DOUBLE PRECISION not null,
    banco_rd DOUBLE PRECISION not null,
    -- Ventas
    ventas_rd DOUBLE PRECISION not null,
    fkcods_rd integer not null default 1,
    foreign key(fkcods_rd) references tmstatus(cods) on update cascade on delete restrict
);

-- -- Mes 1
-- INSERT INTO tmreporte_diario (fecha_rd, compras_rd, varios_rd, salarios_rd, arriendo_rd, gas_rd, servicios_rd, vehiculo_rd, banco_rd, ventas_rd)
-- VALUES 
-- ('2024-10-01', 150000, 20000, 50000, 30000, 50000, 80000, 40000, 100000, 1200000),
-- ('2024-10-02', 200000, 25000, 50000, 30000, 45000, 85000, 30000, 110000, 1300000),
-- ('2024-10-03', 180000, 22000, 50000, 30000, 48000, 82000, 35000, 105000, 1250000),
-- ('2024-10-04', 170000, 30000, 50000, 30000, 55000, 75000, 50000, 115000, 1350000),
-- ('2024-10-06', 150000, 20000, 50000, 30000, 50000, 80000, 40000, 100000, 1200000),
-- ('2024-10-07', 200000, 25000, 50000, 30000, 45000, 85000, 30000, 110000, 1300000),
-- ('2024-10-08', 180000, 22000, 50000, 30000, 48000, 82000, 35000, 105000, 1250000),
-- ('2024-10-09', 170000, 30000, 50000, 30000, 55000, 75000, 50000, 115000, 1350000),
-- ('2024-10-10', 210000, 28000, 50000, 30000, 52000, 78000, 45000, 120000, 1400000),
-- ('2024-10-11', 150000, 20000, 50000, 30000, 50000, 80000, 40000, 100000, 1200000),
-- ('2024-10-13', 180000, 22000, 50000, 30000, 48000, 82000, 35000, 105000, 1250000),
-- ('2024-10-14', 170000, 30000, 50000, 30000, 55000, 75000, 50000, 115000, 1350000),
-- ('2024-10-15', 210000, 28000, 50000, 30000, 52000, 78000, 45000, 120000, 1400000),
-- ('2024-10-16', 150000, 20000, 50000, 30000, 50000, 80000, 40000, 100000, 1200000),
-- ('2024-10-17', 200000, 25000, 50000, 30000, 45000, 85000, 30000, 110000, 1300000),
-- ('2024-10-18', 180000, 22000, 50000, 30000, 48000, 82000, 35000, 105000, 1250000),
-- ('2024-10-20', 210000, 28000, 50000, 30000, 52000, 78000, 45000, 120000, 1400000),
-- ('2024-10-21', 150000, 20000, 50000, 30000, 50000, 80000, 40000, 100000, 1200000),
-- ('2024-10-22', 200000, 25000, 50000, 30000, 45000, 85000, 30000, 110000, 1300000),
-- ('2024-10-23', 180000, 22000, 50000, 30000, 48000, 82000, 35000, 105000, 1250000),
-- ('2024-10-24', 170000, 30000, 50000, 30000, 55000, 75000, 50000, 115000, 1350000),
-- ('2024-10-25', 210000, 28000, 50000, 30000, 52000, 78000, 45000, 120000, 1400000),
-- ('2024-10-27', 200000, 25000, 50000, 30000, 45000, 85000, 30000, 110000, 1300000),
-- ('2024-10-28', 180000, 22000, 50000, 30000, 48000, 82000, 35000, 105000, 1250000),
-- ('2024-10-29', 170000, 30000, 50000, 30000, 55000, 75000, 50000, 115000, 1350000),
-- ('2024-10-30', 210000, 28000, 50000, 30000, 52000, 78000, 45000, 120000, 1400000),
-- ('2024-10-31', 150000, 20000, 50000, 30000, 50000, 80000, 40000, 100000, 1200000);


-- -- Mes 2
-- INSERT INTO tmreporte_diario (fecha_rd, compras_rd, varios_rd, salarios_rd, arriendo_rd, gas_rd, servicios_rd, vehiculo_rd, banco_rd, ventas_rd)
-- VALUES 
-- ('2024-11-01', 190000, 18000, 500000, 300000, 50000, 85000, 45000, 100000, 1250000),
-- ('2024-11-02', 160000, 20000, 500000, 300000, 47000, 80000, 42000, 108000, 1280000),
-- ('2024-11-03', 180000, 23000, 500000, 300000, 53000, 90000, 40000, 115000, 1350000),
-- ('2024-11-04', 200000, 19000, 500000, 300000, 50000, 75000, 38000, 120000, 1400000),
-- ('2024-11-05', 170000, 21000, 500000, 300000, 52000, 82000, 44000, 110000, 1330000),
-- ('2024-11-06', 190000, 18000, 500000, 300000, 50000, 85000, 45000, 100000, 1250000),
-- ('2024-11-07', 160000, 20000, 500000, 300000, 47000, 80000, 42000, 108000, 1280000),
-- ('2024-11-08', 180000, 23000, 500000, 300000, 53000, 90000, 40000, 115000, 1350000),
-- ('2024-11-09', 200000, 19000, 500000, 300000, 50000, 75000, 38000, 120000, 1400000),
-- ('2024-11-10', 170000, 21000, 500000, 300000, 52000, 82000, 44000, 110000, 1330000),
-- ('2024-11-11', 190000, 18000, 500000, 300000, 50000, 85000, 45000, 100000, 1250000),
-- ('2024-11-12', 160000, 20000, 500000, 300000, 47000, 80000, 42000, 108000, 1280000),
-- ('2024-11-13', 180000, 23000, 500000, 300000, 53000, 90000, 40000, 115000, 1350000),
-- ('2024-11-14', 200000, 19000, 500000, 300000, 50000, 75000, 38000, 120000, 1400000),
-- ('2024-11-15', 170000, 21000, 500000, 300000, 52000, 82000, 44000, 110000, 1330000),
-- ('2024-11-16', 190000, 18000, 500000, 300000, 50000, 85000, 45000, 100000, 1250000),
-- ('2024-11-17', 160000, 20000, 500000, 300000, 47000, 80000, 42000, 108000, 1280000),
-- ('2024-11-18', 180000, 23000, 500000, 300000, 53000, 90000, 40000, 115000, 1350000),
-- ('2024-11-19', 200000, 19000, 500000, 300000, 50000, 75000, 38000, 120000, 1400000),
-- ('2024-11-20', 170000, 21000, 500000, 300000, 52000, 82000, 44000, 110000, 1330000),
-- ('2024-11-21', 190000, 18000, 500000, 300000, 50000, 85000, 45000, 100000, 1250000),
-- ('2024-11-22', 160000, 20000, 500000, 300000, 47000, 80000, 42000, 108000, 1280000),
-- ('2024-11-23', 180000, 23000, 500000, 300000, 53000, 90000, 40000, 115000, 1350000);
