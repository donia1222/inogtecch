<?php
// ─────────────────────────────────────────────────────────
//  contact_messages.php — Mensajes del formulario de contacto
//
//  POST /contact_messages.php           → guardar mensaje (público)
//  GET  /contact_messages.php           → leer todos (solo admin)
//  PUT  /contact_messages.php?id=X      → marcar como leído (admin)
//  DELETE /contact_messages.php?id=X    → eliminar (admin)
// ─────────────────────────────────────────────────────────
require_once __DIR__ . '/cors.php';

$method = $_SERVER['REQUEST_METHOD'];
$db     = getDB();

// ── POST — guardar mensaje desde el formulario (público) ──
if ($method === 'POST') {
    $body    = getBody();
    $name    = trim($body['name']    ?? '');
    $email   = trim($body['email']   ?? '');
    $phone   = trim($body['phone']   ?? '');
    $message = trim($body['message'] ?? '');

    if ($name === '' || $email === '' || $message === '') {
        jsonResponse(['error' => 'Name, E-Mail und Nachricht sind erforderlich'], 400);
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonResponse(['error' => 'Ungültige E-Mail-Adresse'], 400);
    }

    $stmt = $db->prepare(
        'INSERT INTO contact_messages (name, email, phone, message, created_at, is_read)
         VALUES (:name, :email, :phone, :msg, NOW(), 0)'
    );
    $stmt->execute([
        ':name'  => $name,
        ':email' => $email,
        ':phone' => $phone,
        ':msg'   => $message,
    ]);

    jsonResponse(['message' => 'Nachricht erfolgreich gesendet'], 201);
}

// ── GET — leer todos los mensajes (solo admin) ───────────
if ($method === 'GET') {
    requireAuth();
    $rows = $db->query(
        'SELECT * FROM contact_messages ORDER BY created_at DESC'
    )->fetchAll();
    jsonResponse($rows);
}

// ── PUT — marcar como leído (admin) ─────────────────────
if ($method === 'PUT') {
    requireAuth();
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) jsonResponse(['error' => 'ID erforderlich'], 400);

    $body    = getBody();
    $is_read = (int)($body['is_read'] ?? 1);

    $db->prepare('UPDATE contact_messages SET is_read = :read WHERE id = :id')
       ->execute([':read' => $is_read, ':id' => $id]);
    jsonResponse(['message' => 'Status aktualisiert']);
}

// ── DELETE — eliminar mensaje (admin) ────────────────────
if ($method === 'DELETE') {
    requireAuth();
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) jsonResponse(['error' => 'ID erforderlich'], 400);

    $db->prepare('DELETE FROM contact_messages WHERE id = :id')->execute([':id' => $id]);
    jsonResponse(['message' => 'Nachricht gelöscht']);
}

jsonResponse(['error' => 'Methode nicht erlaubt'], 405);
