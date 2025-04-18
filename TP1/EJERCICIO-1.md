# Creación de la Base de Datos y Tablas
```markdown
# Base de Datos: Universidad

-- Crear la base de datos y seleccionarla
CREATE DATABASE Universidad;
USE Universidad;
```
# Creacion de las tablas

```sql

-- Crear la tabla Estudiantes
CREATE TABLE Estudiantes(
    id_estudiante INT PRIMARY KEY,
    nombre VARCHAR(50)
);

-- Crear la tabla Cursos
CREATE TABLE Cursos(
    id_curso INT PRIMARY KEY,
    nombre_curso VARCHAR(50)
);

-- Crear la tabla Inscripciones con claves foráneas hacia Estudiantes y Cursos
CREATE TABLE Inscripciones(
    id_inscripcion INT PRIMARY KEY,
    id_estudiante INT,
    id_curso INT,
    
    -- Mecanismo de integridad referencial
    -- ON DELETE RESTRICT evita eliminar un estudiante con inscripciones asociadas
    FOREIGN KEY (id_estudiante) REFERENCES Estudiantes(id_estudiante) ON DELETE RESTRICT,
    FOREIGN KEY (id_curso) REFERENCES Cursos(id_curso) ON DELETE RESTRICT
);
```

## Consultas Iniciales

```sql
-- Consultar las tablas para verificar que estén vacías inicialmente
SELECT * FROM Estudiantes;
SELECT * FROM Cursos;
SELECT * FROM Inscripciones;
```

## Inserción de Datos

```sql
-- Insertar estudiantes
INSERT INTO Estudiantes (id_estudiante, nombre) VALUES
(1, 'Juan Pérez'),
(2, 'María Gómez'),
(3, 'Carlos Ramírez'),
(4, 'Laura Fernández'),
(5, 'Andrés Torres'),
(6, 'Lucía Medina');

-- Insertar cursos
INSERT INTO Cursos(id_curso, nombre_curso) VALUES
(10, 'Matemática I'),
(11, 'Programación I'),
(12, 'Bases de Datos'),
(13, 'Sistemas Operativos'),
(14, 'Redes de Computadoras');

-- Insertar inscripciones que relacionan estudiantes con cursos
INSERT INTO Inscripciones (id_inscripcion, id_estudiante, id_curso) VALUES
(1001, 1, 10), 
(1002, 1, 11),  
(1003, 2, 11),  
(1004, 3, 12), 
(1005, 3, 13), 
(1006, 4, 10), 
(1007, 4, 12), 
(1008, 5, 14),  
(1009, 6, 13);  
```

## Verificación de Datos

```sql
-- Verificar los datos insertados
SELECT * FROM Estudiantes;
SELECT * FROM Cursos;
SELECT * FROM Inscripciones;
```

## Prueba de Restricción de Integridad Referencial

```sql
-- Intentar eliminar al estudiante Juan (id=1), inscrito en dos cursos
-- Esta operación FALLARÁ si ON DELETE RESTRICT funciona correctamente
DELETE FROM Estudiantes WHERE id_estudiante = 1;
```
# Error esperado:
```sql

 Error Code: 1451. Cannot delete or update a parent row: a foreign key constraint fails 
(`universidad`.`inscripciones`, CONSTRAINT `inscripciones_ibfk_1` FOREIGN KEY (`id_estudiante`) 
REFERENCES `estudiantes` (`id_estudiante`) ON DELETE RESTRICT)
```

