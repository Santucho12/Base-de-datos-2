drop index idx_precio_categoria on productos;

-- consulta que filtra por múltiples campos: precio y categoria PERO SIN INDICE
explain SELECT * FROM productos
WHERE precio > 1400 AND stock >499;
-- 1	SIMPLE	productos		ALL					98612	11.11	Using where



--  Crear índice solo sobre "precio"
CREATE INDEX idx_precio ON productos(precio);
explain SELECT * FROM productos
WHERE precio > 1400 AND stock >499;
-- 1	SIMPLE	productos		range	idx_precio	idx_precio	6		6612	33.33	Using index condition; Using where

--  Crear índice solo sobre "categoria_id"
CREATE INDEX idx_categoria ON productos(categoria_id);
explain SELECT * FROM productos
WHERE precio > 1400 AND stock >499;
-- 1	SIMPLE	productos		range	idx_precio	idx_precio	6		6612	33.33	Using index condition; Using where



--  Crear índice combinado sobre ambos campos
CREATE INDEX idx_precio_stock ON productos(precio, stock);
explain SELECT * FROM productos
WHERE precio > 1400 AND stock >499;
-- 1	SIMPLE	productos		range	idx_precio,idx_precio_stock	idx_precio	6		6612	33.33	Using index condition; Using where

SHOW INDEXES FROM productos;
