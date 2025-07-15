-- Script de inicialización de la base de datos
-- Este script se ejecutará cuando se inicie el contenedor MySQL

USE auth_users;

-- Crear tabla de usuarios (ejemplo básico)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear tabla de tareas (ejemplo básico)
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insertar algunos datos de ejemplo
INSERT IGNORE INTO users (username, email, password) VALUES
('admin', 'admin@example.com', 'hashed_password_here'),
('user1', 'user1@example.com', 'hashed_password_here');

INSERT IGNORE INTO tasks (title, description, status, user_id) VALUES
('Configurar base de datos', 'Configurar la conexión a MySQL', 'completed', 1),
('Crear entidades', 'Crear las entidades de TypeORM', 'in_progress', 1),
('Implementar autenticación', 'Implementar JWT authentication', 'pending', 1);

-- Limpiar retroalimentaciones individuales huérfanas
DELETE FROM retroalimentaciones_individuales
WHERE asignacion_individual_id NOT IN (SELECT id FROM asignaciones_individuales); 