-- Creamos la base de datos y la seleccionamos
CREATE DATABASE Universidad;
USE Universidad;

-- Creamos la tabla Estudiantes
CREATE TABLE Estudiantes(
  id_estudiante INT PRIMARY KEY,
  nombre VARCHAR(50)
);

-- Creamos la tabla Cursos
CREATE TABLE Cursos(
  id_curso INT PRIMARY KEY,
  nombre_curso VARCHAR(50)
);

-- Creamos la tabla Inscripciones, que tiene claves foráneas hacia Estudiantes y Cursos
CREATE TABLE Inscripciones(
  id_inscripcion INT PRIMARY KEY,
  id_estudiante INT,
  id_curso INT,
  
  -- IMPORTANTE: Mecanismo de integridad referencial
  -- Se usa ON DELETE RESTRICT para evitar que se elimine un estudiante
  -- si tiene inscripciones asociadas. esto protege los datos.
  FOREIGN KEY (id_estudiante) REFERENCES Estudiantes(id_estudiante) ON DELETE RESTRICT,
  FOREIGN KEY (id_curso) REFERENCES Cursos(id_curso) ON DELETE RESTRICT
);

-- consuto las tablas para verificar que esten vacias al principio
SELECT * FROM Estudiantes;
SELECT * FROM Cursos;
SELECT * FROM Inscripciones;

-- inserto estudiantes
INSERT INTO Estudiantes (id_estudiante, nombre) VALUES
(1, 'Juan Pérez'),
(2, 'María Gómez'),
(3, 'Carlos Ramírez'),
(4, 'Laura Fernández'),
(5, 'Andrés Torres'),
(6, 'Lucía Medina');

-- Insertamos cursos
INSERT INTO Cursos(id_curso, nombre_curso) VALUES
(10, 'Matemática I'),
(11, 'Programación I'),
(12, 'Bases de Datos'),
(13, 'Sistemas Operativos'),
(14, 'Redes de Computadoras');

-- inserto inscripciones
-- cada inscripción relaciona un estudiante con un curso
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

-- chequeamos los datos insertados
SELECT * FROM Estudiantes;
SELECT * FROM Cursos;
SELECT * FROM Inscripciones;

-- intetno eliminar al estudiante Juan (id=1), que está inscrito en dos cursos
-- esta operación va a FALLAR si ON DELETE RESTRICT está funcionando correctamente
-- porque existen inscripciones referenciando al estudiante.
DELETE FROM Estudiantes WHERE id_estudiante = 1;

-- el error es:
DELETE FROM Estudiantes WHERE id_estudiante = 1	Error Code: 1451. Cannot delete or update a parent row: a foreign key constraint fails (`universidad`.`inscripciones`, CONSTRAINT `inscripciones_ibfk_1` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id_estudiante`) ON DELETE RESTRICT)
