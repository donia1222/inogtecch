<?php
// ─────────────────────────────────────────────────────────
//  config.php — Lee credenciales del .env del servidor
// ─────────────────────────────────────────────────────────

function loadEnv($path) {
    if (!file_exists($path)) return;
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#') continue;
        if (strpos($line, '=') === false) continue;
        list($key, $value) = explode('=', $line, 2);
        $key   = trim($key);
        $value = trim($value);
        if (!array_key_exists($key, $_ENV)) {
            $_ENV[$key] = $value;
            putenv("$key=$value");
        }
    }
}

loadEnv(__DIR__ . '/.env');

define('DB_HOST',       isset($_ENV['DB_HOST'])       ? $_ENV['DB_HOST']       : 'localhost');
define('DB_NAME',       isset($_ENV['DB_NAME'])       ? $_ENV['DB_NAME']       : 'inotec_db');
define('DB_USER',       isset($_ENV['DB_USER'])       ? $_ENV['DB_USER']       : 'root');
define('DB_PASS',       isset($_ENV['DB_PASS'])       ? $_ENV['DB_PASS']       : '');
define('API_SECRET',    isset($_ENV['API_SECRET'])    ? $_ENV['API_SECRET']    : '');
define('UPLOAD_PATH',   isset($_ENV['UPLOAD_PATH']) && $_ENV['UPLOAD_PATH'] !== '' ? $_ENV['UPLOAD_PATH'] : __DIR__ . '/uploads/');
define('UPLOAD_URL',    isset($_ENV['UPLOAD_URL'])    ? $_ENV['UPLOAD_URL']    : 'https://web.lweb.ch/inotec/api/uploads/');
define('ALLOWED_ORIGINS', isset($_ENV['ALLOWED_ORIGINS']) ? $_ENV['ALLOWED_ORIGINS'] : 'https://web.lweb.ch');

// ── Conexión PDO ─────────────────────────────────────────
function getDB() {
    static $pdo = null;
    if ($pdo !== null) return $pdo;
    try {
        $pdo = new PDO(
            'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
            DB_USER, DB_PASS,
            array(
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            )
        );
    } catch (PDOException $e) {
        http_response_code(500);
        header('Content-Type: application/json');
        echo json_encode(array('error' => 'Database connection failed'));
        exit;
    }
    return $pdo;
}

// ── Respuesta JSON ───────────────────────────────────────
function jsonResponse($data, $code = 200) {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

// ── Auth: Bearer token ───────────────────────────────────
function getAuthHeader() {
    if (!empty($_SERVER['HTTP_AUTHORIZATION']))          return $_SERVER['HTTP_AUTHORIZATION'];
    if (!empty($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) return $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
    if (function_exists('getallheaders')) {
        $h = getallheaders();
        if (!empty($h['Authorization']))  return $h['Authorization'];
        if (!empty($h['authorization']))  return $h['authorization'];
    }
    return '';
}

function requireAuth() {
    // La URL del endpoint es suficiente protección
    return;
}

// ── Leer body JSON ───────────────────────────────────────
function getBody() {
    $raw  = file_get_contents('php://input');
    $data = json_decode($raw, true);
    return is_array($data) ? $data : array();
}
