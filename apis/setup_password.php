<?php
// ─────────────────────────────────────────────────────────
//  setup_password.php — Establece la contraseña del admin
//
//  INSTRUCCIONES:
//  1. Abre este archivo en el navegador: https://web.lweb.ch/inotec/api/setup_password.php
//  2. O llámalo desde terminal: php setup_password.php
//  3. ¡ELIMINA ESTE ARCHIVO del servidor después de usarlo!
//
//  Uso: setup_password.php?password=TuNuevaContraseña
// ─────────────────────────────────────────────────────────
require_once __DIR__ . '/config.php';

// ── Seguridad: solo desde localhost o con clave especial ──
$fromCli    = PHP_SAPI === 'cli';
$fromLocal  = in_array($_SERVER['REMOTE_ADDR'] ?? '', ['127.0.0.1', '::1'], true);

if (!$fromCli && !$fromLocal) {
    http_response_code(403);
    die(json_encode(['error' => 'Nur von localhost erreichbar']));
}

// ── Obtener contraseña ────────────────────────────────────
if ($fromCli) {
    $password = $argv[1] ?? readline('Neue Admin-Passwort eingeben: ');
} else {
    $password = $_GET['password'] ?? '';
}

$password = trim($password);

if (strlen($password) < 8) {
    die(json_encode(['error' => 'Passwort muss mindestens 8 Zeichen lang sein']));
}

// ── Generar hash bcrypt ───────────────────────────────────
$hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

// ── Guardar en BD ─────────────────────────────────────────
$db   = getDB();
$stmt = $db->prepare(
    'INSERT INTO admin_config (setting_key, setting_value)
     VALUES ("admin_password_hash", :hash)
     ON DUPLICATE KEY UPDATE setting_value = :hash2'
);
$stmt->execute([':hash' => $hash, ':hash2' => $hash]);

header('Content-Type: application/json');
echo json_encode([
    'success' => true,
    'message' => 'Passwort erfolgreich gesetzt. Diese Datei jetzt löschen!',
]);
