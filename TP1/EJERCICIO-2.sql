-- Crear la base de datos y usarla
CREATE DATABASE escuela;
USE escuela;

-- Crear la tabla de Estudiantes (para la clave foránea)
CREATE TABLE Estudiantes(
    id_estudiante INT PRIMARY KEY,
    nombre VARCHAR(100)
);

-- Insertar algunos estudiantes
INSERT INTO Estudiantes(id_estudiante, nombre)
VALUES 
(1, 'Juan Pérez'),
(2, 'María Gómez'),
(3, 'Carlos Ramírez');

-- Crear la tabla de Materias (para la clave foránea)
CREATE TABLE Materias(
    id_materia INT PRIMARY KEY,
    nombre_materia VARCHAR(100)
);

-- Insertar algunas materias
INSERT INTO Materias(id_materia, nombre_materia)
VALUES 
(1, 'Matemáticas I'),
(2, 'Programación I'),
(3, 'Física General');

-- Crear la tabla de Matriculas con restricciones de clave foránea
CREATE TABLE Matriculas(
    id_matricula INT PRIMARY KEY,
    id_estudiante INT,
    id_materia INT,
    FOREIGN KEY (id_estudiante) REFERENCES Estudiantes(id_estudiante),
    FOREIGN KEY (id_materia) REFERENCES Materias(id_materia)
);

-- Verificar que las tablas estén vacías
SELECT * FROM Estudiantes;
SELECT * FROM Materias;
SELECT * FROM Matriculas;

-- --------------------------
-- Insertar datos en la tabla Matriculas (correctos)
-- --------------------------

-- Insertar una matrícula válida
INSERT INTO Matriculas(id_matricula, id_estudiante, id_materia)
VALUES (1, 1, 1);  -- Estudiante con id 1 se matricula en la materia con id 1

-- Insertar otra matrícula válida
INSERT INTO Matriculas(id_matricula, id_estudiante, id_materia)
VALUES (2, 2, 2);  -- Estudiante con id 2 se matricula en la materia con id 2

-- --------------------------
-- Insertar datos que violen la integridad referencial
-- --------------------------

-- Intento de insertar una matrícula con un estudiante que no existe (violación de clave foránea)
INSERT INTO Matriculas(id_matricula, id_estudiante, id_materia)
VALUES (3, 999, 1);  -- El id_estudiante 999 no existe en la tabla Estudiantes

-- Intento de insertar una matrícula con una materia que no existe (violación de clave foránea)
INSERT INTO Matriculas(id_matricula, id_estudiante, id_materia)
VALUES (4, 1, 999);  -- El id_materia 999 no existe en la tabla Materias

-- Verificar la tabla Matriculas después de los intentos de inserción
SELECT * FROM Matriculas;
