<?php
// ─────────────────────────────────────────────────────────
//  ticker.php — Cinta de tecnologías animada (Home)
//  GET    /ticker.php           → lista todos (público)
//  POST   /ticker.php           → nuevo item (admin)
//  PUT    /ticker.php?id=X      → editar (admin)
//  DELETE /ticker.php?id=X      → eliminar (admin)
// ─────────────────────────────────────────────────────────
require_once __DIR__ . '/cors.php';

$method = $_SERVER['REQUEST_METHOD'];
$db     = getDB();

// ── GET ──────────────────────────────────────────────────
if ($method === 'GET') {
    $rows = $db->query('SELECT * FROM ticker_items ORDER BY sort_order ASC')->fetchAll();
    jsonResponse($rows);
}

// ── POST ─────────────────────────────────────────────────
if ($method === 'POST') {
    requireAuth();
    $body = getBody();
    $text = trim($body['text'] ?? '');

    if ($text === '') jsonResponse(['error' => 'Text erforderlich'], 400);

    $maxOrder = $db->query('SELECT COALESCE(MAX(sort_order),0) FROM ticker_items')->fetchColumn();
    $stmt = $db->prepare('INSERT INTO ticker_items (text, sort_order) VALUES (:text, :sort_order)');
    $stmt->execute([':text' => $text, ':sort_order' => $maxOrder + 1]);

    jsonResponse(['message' => 'Item hinzugefügt', 'id' => $db->lastInsertId()], 201);
}

// ── PUT ──────────────────────────────────────────────────
if ($method === 'PUT') {
    requireAuth();
    $id   = (int)($_GET['id'] ?? 0);
    $body = getBody();

    if (!$id) jsonResponse(['error' => 'ID erforderlich'], 400);

    $stmt = $db->prepare('UPDATE ticker_items SET text = :text, sort_order = :sort_order WHERE id = :id');
    $stmt->execute([
        ':text'       => trim($body['text'] ?? ''),
        ':sort_order' => (int)($body['sort_order'] ?? 0),
        ':id'         => $id,
    ]);

    jsonResponse(['message' => 'Item aktualisiert']);
}

// ── DELETE ───────────────────────────────────────────────
if ($method === 'DELETE') {
    requireAuth();
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) jsonResponse(['error' => 'ID erforderlich'], 400);

    $db->prepare('DELETE FROM ticker_items WHERE id = :id')->execute([':id' => $id]);
    jsonResponse(['message' => 'Item gelöscht']);
}

jsonResponse(['error' => 'Methode nicht erlaubt'], 405);
