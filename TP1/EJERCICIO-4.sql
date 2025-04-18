-- Usar la base de datos 'ecommerce' (si ya existe)
USE ecommerce;

-- Verificar los productos disponibles en la tabla 'productos'
SELECT * FROM productos;

--  Ejecutar una consulta usando EXPLAIN para ver el plan de ejecución sin índice
-- Esta consulta muestra cómo MySQL ejecutaría la búsqueda sin usar el índice en la columna 'precio'.
EXPLAIN SELECT * FROM productos WHERE precio <= 20;
1	SIMPLE	productos		ALL					98612	33.33	Using where


-- Crear un índice en la columna 'precio' para optimizar las búsquedas en ella
-- creamos el índice 'idx_precio' en la columna 'precio' para acelerar las búsquedas.
CREATE INDEX idx_precio ON productos(precio);
-- Ejecutar la misma consulta que antes, ahora con el índice
-- La consulta ahora se ejecutará con el índice 'idx_precio' y debería mostrar un plan de ejecución más eficiente.
EXPLAIN SELECT * FROM productos WHERE precio <= 20;
-- '1', 'SIMPLE', 'productos', NULL, 'range', 'idx_precio', 'idx_precio', '6', NULL, '1029', '100.00', 'Using index condition'


-- antes y después de crear el índice. El uso del índice debería mejorar el rendimiento de las consultas que filtran por el campo 'precio'.
