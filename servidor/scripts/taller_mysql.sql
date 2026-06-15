CREATE DATABASE IF NOT EXISTS taller_mecanico
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE taller_mecanico;

SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM reparaciones;
DELETE FROM vehiculos;
DELETE FROM mecanicos;
DELETE FROM clientes;

ALTER TABLE reparaciones AUTO_INCREMENT = 1;
ALTER TABLE vehiculos AUTO_INCREMENT = 1;
ALTER TABLE mecanicos AUTO_INCREMENT = 1;
ALTER TABLE clientes AUTO_INCREMENT = 1;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO clientes (nombre, apellidos, email, telefono, dni, fecha_alta) VALUES
('Laura', 'Sánchez Ruiz', 'laura.sanchez@email.com', '600123456', '12345678A', '2026-01-10'),
('Carlos', 'Martín López', 'carlos.martin@email.com', '611222333', '23456789B', '2026-01-15'),
('Marta', 'Gómez Pérez', 'marta.gomez@email.com', '622333444', '34567890C', '2026-02-02'),
('Andrés', 'Romero Díaz', 'andres.romero@email.com', '633444555', '45678901D', '2026-02-20'),
('Nerea', 'Torres Molina', 'nerea.torres@email.com', '644555666', '56789012E', '2026-03-05');

INSERT INTO mecanicos (nombre, apellidos, especialidad, email, telefono, activo) VALUES
('Javier', 'Ortega Ramos', 'Motor y diagnosis', 'javier.ortega@tallerpro.com', '655111222', true),
('Lucía', 'Navarro Gil', 'Electricidad y electrónica', 'lucia.navarro@tallerpro.com', '655222333', true),
('Miguel', 'Hernández Soto', 'Frenos y suspensión', 'miguel.hernandez@tallerpro.com', '655333444', true),
('Sara', 'Vega Campos', 'Mantenimiento general', 'sara.vega@tallerpro.com', '655444555', true);

INSERT INTO vehiculos (id_cliente, marca, modelo, matricula, anio, tipo, kilometraje, estado) VALUES
(1, 'Seat', 'León', '1234ABC', 2018, 'Coche', 120000, 'En reparación'),
(1, 'Yamaha', 'MT-07', '5678DEF', 2020, 'Moto', 32000, 'Activo'),
(2, 'Ford', 'Transit', '9012GHI', 2017, 'Furgoneta', 185000, 'En reparación'),
(3, 'Toyota', 'Corolla', '3456JKL', 2021, 'Coche', 54000, 'Activo'),
(4, 'Renault', 'Clio', '7890MNO', 2015, 'Coche', 142000, 'Entregado'),
(5, 'Mercedes', 'Actros', '1122PQR', 2019, 'Camión', 310000, 'En reparación');

INSERT INTO reparaciones (
  id_vehiculo,
  id_mecanico,
  titulo,
  descripcion,
  fecha_entrada,
  fecha_salida,
  estado,
  prioridad,
  coste_estimado,
  coste_final
) VALUES
(1, 1, 'Fallo de encendido', 'El vehículo presenta tirones al acelerar y testigo de motor encendido.', '2026-05-20', NULL, 'En proceso', 'Alta', 350.00, NULL),
(3, 2, 'Problema eléctrico', 'Las luces interiores fallan de forma intermitente.', '2026-05-22', NULL, 'Pendiente', 'Media', 180.00, NULL),
(5, 4, 'Cambio de aceite y filtros', 'Mantenimiento periódico completo.', '2026-05-10', '2026-05-11', 'Finalizada', 'Baja', 120.00, 115.00),
(6, 3, 'Revisión de frenos', 'El conductor nota vibraciones al frenar a alta velocidad.', '2026-05-24', NULL, 'En proceso', 'Urgente', 480.00, NULL),
(4, 1, 'Diagnosis preventiva', 'Revisión general antes de viaje largo.', '2026-05-18', '2026-05-18', 'Finalizada', 'Media', 90.00, 90.00);