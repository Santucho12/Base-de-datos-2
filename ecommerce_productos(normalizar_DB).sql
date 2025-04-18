create table marcas(
id int auto_increment primary key not null unique,
marca varchar(255) unique
);

create table categorias(
id int auto_increment primary key not null unique,
categoria varchar(255)unique
);


select DISTINCT MARCA from productos;

insert into marcas(marca) values
('Oscorp'),
('Acme'),
('Soylent'),
('Wonka'),
('Wayne'),
('Stark'),
('Initech'),
('Globex'),
('Umbrella'),
('Hooli');


select * from marcas;
select * from productos;


alter table productos add column marca_id int;

SET SQL_SAFE_UPDATES = 0;

UPDATE productos
JOIN marcas ON productos.marca = marcas.marca
SET productos.marca_id = marcas.id;

alter table productos drop column marca;

alter table productos add constraint fk_marca
foreign key (marca_id)references marcas(id);


insert into categorias(categoria)
select distinct categoria from productos;
select *from categorias;

select * from productos;



ALTER TABLE productos ADD COLUMN categoria_id int ;


SET SQL_SAFE_UPDATES = 0;

UPDATE productos
JOIN marcas ON productos.marca = marcas.marca
SET productos.marca_id = marcas.id;

update productos
join categorias on productos.categoria= categorias.categoria
set productos.categoria_id = categorias.id;



alter table productos drop column categoria;




alter table productos add constraint  fk_categoria
foreign key (categoria_id)references categorias(id);
