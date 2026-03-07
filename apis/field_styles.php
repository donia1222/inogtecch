<?php
// field_styles.php — Estilos por campo individual
// GET  /field_styles.php           -> todos
// PUT  /field_styles.php?key=x     -> actualiza uno
require_once __DIR__ . '/cors.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $db = getDB();
    // Crear tabla si no existe
    $db->exec("CREATE TABLE IF NOT EXISTS field_styles (
        id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        style_key  VARCHAR(150) NOT NULL UNIQUE,
        font_size  VARCHAR(20) DEFAULT NULL,
        font_color VARCHAR(50) DEFAULT NULL,
        font_family VARCHAR(100) DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    $stmt = $db->query('SELECT * FROM field_styles');
    $rows = $stmt->fetchAll();
    $out = [];
    foreach ($rows as $r) {
        $out[$r['style_key']] = $r;
    }
    jsonResponse($out);
}

if ($method === 'PUT') {
    requireAuth();
    $key = isset($_GET['key']) ? $_GET['key'] : '';
    if (!$key) jsonResponse(['error' => 'key requerido'], 400);

    $body = getBody();
    $db   = getDB();

    // Crear tabla si no existe
    $db->exec("CREATE TABLE IF NOT EXISTS field_styles (
        id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        style_key  VARCHAR(150) NOT NULL UNIQUE,
        font_size  VARCHAR(20) DEFAULT NULL,
        font_color VARCHAR(50) DEFAULT NULL,
        font_family VARCHAR(100) DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    $fs = (isset($body['font_size']) && $body['font_size'] !== '') ? $body['font_size'] : null;
    $fc = (isset($body['font_color']) && $body['font_color'] !== '') ? $body['font_color'] : null;
    $ff = (isset($body['font_family']) && $body['font_family'] !== '') ? $body['font_family'] : null;

    $stmt = $db->prepare('INSERT INTO field_styles (style_key, font_size, font_color, font_family)
        VALUES (:k, :fs, :fc, :ff)
        ON DUPLICATE KEY UPDATE font_size = :fs2, font_color = :fc2, font_family = :ff2');
    $stmt->execute([
        ':k' => $key, ':fs' => $fs, ':fc' => $fc, ':ff' => $ff,
        ':fs2' => $fs, ':fc2' => $fc, ':ff2' => $ff,
    ]);

    jsonResponse(['message' => 'Stil gespeichert']);
}

jsonResponse(['error' => 'Methode nicht erlaubt'], 405);
