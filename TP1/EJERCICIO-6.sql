-- Crear la base de datos 'ventas_ecommerce'
CREATE DATABASE ventas_ecommerce;
USE ventas_ecommerce;

-- Crear la tabla 'productos' con información básica sobre productos
CREATE TABLE productos (
    id_producto INT PRIMARY KEY AUTO_INCREMENT,  -- ID único para cada producto
    nombre VARCHAR(30),                         -- Nombre del producto
    categoria VARCHAR(30)                       -- Categoría del producto (ej. electrónica, ropa)
);

-- Crear la tabla 'ventas' para registrar las ventas de los productos
CREATE TABLE ventas (
    id_venta INT PRIMARY KEY AUTO_INCREMENT,    -- ID único para cada venta
    id_producto INT,                             -- ID del producto vendido
    fecha DATE NOT NULL,                         -- Fecha de la venta
    cantidad INT NOT NULL,                       -- Cantidad de productos vendidos
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)  -- Relación con la tabla 'productos'
);

-- Insertar datos de productos
INSERT INTO productos(nombre, categoria) VALUES
('producto a', 'electronica'),
('Producto B', 'Ropa'),
('Producto C', 'Electrónica'),
('Producto D', 'Electrónica'),
('Producto E', 'Ropa');

-- Insertar datos de ventas
INSERT INTO ventas(id_producto, fecha, cantidad) VALUES
(1, '2023-01-01', 10),
(2, '2023-01-02', 5),
(3, '2023-02-01', 15),
(4, '2023-03-01', 8),
(5, '2023-01-10', 20),
(1, '2023-02-15', 25),
(3, '2023-03-01', 10);

-- Crear la vista 'ventas_mensuales' que agrupa las ventas por producto y muestra el total vendido
CREATE VIEW ventas_mensuales AS
SELECT
    productos.id_producto,           -- ID del producto
    productos.nombre,                -- Nombre del producto
    SUM(ventas.cantidad) AS total_vendido  -- Suma de la cantidad vendida para cada producto
FROM ventas
JOIN productos ON ventas.id_producto = productos.id_producto
GROUP BY productos.id_producto, productos.nombre;

-- Consultar los 5 productos más vendidos
SELECT id_producto, nombre, total_vendido FROM ventas_mensuales
ORDER BY total_vendido DESC  -- Ordenar de mayor a menor por la cantidad vendida
LIMIT 5;                     -- Limitar a los 5 productos más vendidos
