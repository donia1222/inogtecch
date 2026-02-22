<?php
// ─────────────────────────────────────────────────────────
//  cors.php — Headers CORS + preflight
//  Incluir al inicio de cada endpoint: require_once 'cors.php';
// ─────────────────────────────────────────────────────────
require_once __DIR__ . '/config.php';

$origin  = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = array_map('trim', explode(',', ALLOWED_ORIGINS));

if (in_array($origin, $allowed, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
} else {
    // En desarrollo permite cualquier localhost
    if (preg_match('/^https?:\/\/localhost(:\d+)?$/', $origin)) {
        header('Access-Control-Allow-Origin: ' . $origin);
    }
}

header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-Studio-Token');
header('Vary: Origin');

// Responder preflight inmediatamente
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
