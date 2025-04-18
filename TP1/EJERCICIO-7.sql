create user 'user'@'localhost' identified by'purre1010';

grant select on ventas_ecommerce.productos to 'user'@'localhost';
show grants for'user'@'localhost';


-- ingreso como user

USE ventas_ecommerce;
SELECT * FROM productos;

INSERT INTO productos(nombre, categoria) VALUES ('Producto F', 'Hogar');
-- Error Code: 1142. INSERT command denied to user 'user'@'localhost' for table 'productos'	0.000 sec
