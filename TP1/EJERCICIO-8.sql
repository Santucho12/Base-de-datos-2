create database auditoria_ecommerce;
use auditoria_ecommerce;

create table Clientes(
id_cliente int primary key auto_increment,
nombre varchar(50)
);

insert into Clientes (nombre)values
('santiago'),
('abner'),
('franco'),
('felipe');

select* from clientes;
select * from auditoria_clientes;


create table Auditoria_clientes(
id_auditoria_clientes int primary key auto_increment,
id_cliente int,
accion varchar(20),
fecha datetime,
nombre_antiguo varchar(50)
);


delimiter //
create trigger trg_update_cliente
after update on Clientes
for each row
begin
insert Auditoria_clientes(id_cliente,accion,fecha,nombre_antiguo)values
(old.id_cliente,'update',now(),old.nombre);
end;
//

create trigger trg_delete_cliente
after delete on Clientes
for each row
begin
insert Auditoria_clientes(id_cliente,accion,fecha,nombre_antiguo)values
(old.id_cliente,'delete',now(),old.nombre);
end;
//
delimiter ;

DELETE FROM clientes WHERE id_cliente = 2;


