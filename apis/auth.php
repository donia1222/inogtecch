<?php
// ─────────────────────────────────────────────────────────
//  auth.php — Login / verificar sesión admin
//
//  POST /auth.php   { "password": "..." }  → login
//  GET  /auth.php                          → check session
// ─────────────────────────────────────────────────────────
require_once __DIR__ . '/cors.php';

// ── Leer hash de la contraseña admin desde DB ────────────
function getAdminHash(): string {
    $db   = getDB();
    $stmt = $db->query('SELECT setting_value FROM admin_config WHERE setting_key = "admin_password_hash" LIMIT 1');
    $row  = $stmt->fetch();
    return $row['setting_value'] ?? '';
}

$method = $_SERVER['REQUEST_METHOD'];

// ── GET — verificar si hay sesión activa ─────────────────
if ($method === 'GET') {
    session_start();
    if (!empty($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
        jsonResponse(['authenticated' => true]);
    }
    jsonResponse(['authenticated' => false]);
}

// ── POST — login ─────────────────────────────────────────
if ($method === 'POST') {
    $body     = getBody();
    $password = trim($body['password'] ?? '');

    if ($password === '') {
        jsonResponse(['error' => 'Passwort erforderlich'], 400);
    }

    $hash = getAdminHash();

    if ($hash === '' || !password_verify($password, $hash)) {
        // Espera artificial para dificultar brute-force
        sleep(1);
        jsonResponse(['error' => 'Falsches Passwort'], 401);
    }

    // Login correcto
    session_start();
    session_regenerate_id(true);
    $_SESSION['admin_logged_in'] = true;
    $_SESSION['login_time']      = time();

    jsonResponse(['authenticated' => true, 'message' => 'Login erfolgreich']);
}

jsonResponse(['error' => 'Methode nicht erlaubt'], 405);
